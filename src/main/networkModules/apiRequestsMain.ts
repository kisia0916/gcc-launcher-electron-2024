import fs from 'node:fs';
import path from 'node:path';
import axios, { AxiosError } from 'axios';
import type { IpcMain } from 'electron';
import { getLauncherRoot } from '../initModules/initGameInfo';

interface NetworkSettings {
  server_address: string;
  basic_auth_user: string;
  basic_auth_pass: string;
}

const readNetworkSettings = (): NetworkSettings => {
  const settingsPath = path.join(getLauncherRoot(), 'launcher-settings.json');
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')) as {
    network_info?: Partial<NetworkSettings>;
  };
  const network = settings.network_info;
  if (!network?.server_address || !network.basic_auth_user || !network.basic_auth_pass) {
    throw new Error('launcher-settings.json の network_info が不完全です');
  }
  return network as NetworkSettings;
};

const errorDetail = (error: unknown) => {
  if (error instanceof AxiosError) {
    const serverMessage = (error.response?.data as any)?.error?.message;
    return serverMessage || (error.response
      ? `HTTP ${error.response.status}`
      : error.code === 'ECONNABORTED'
        ? '通信がタイムアウトしました'
        : error.message);
  }
  return error instanceof Error ? error.message : String(error);
};

const saveOfflineVisitors = (add: number) => {
  const visitorPath = path.join(getLauncherRoot(), 'visitor.txt');
  let current = 0;
  try {
    const value = Number(fs.readFileSync(visitorPath, 'utf-8').trim());
    if (Number.isFinite(value) && value >= 0) current = value;
  } catch {
    // A missing or invalid file starts a fresh offline counter.
  }
  fs.writeFileSync(visitorPath, String(current + add), 'utf-8');
};

const readLocalTimerSeconds = () => {
  try {
    const settingsPath = path.join(getLauncherRoot(), 'launcher-settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')) as { timer?: unknown };
    if (Number.isInteger(settings.timer) && (settings.timer as number) > 0) {
      return settings.timer as number;
    }
  } catch (error) {
    console.error('Failed to read local timer fallback:', errorDetail(error));
  }
  return 360;
};

export const apiRequestMain = (ipcMain: IpcMain) => {
  ipcMain.on('send-init-request', async (event, arg: { genres?: unknown }) => {
    const genres = Array.isArray(arg?.genres)
      ? arg.genres.filter((genre): genre is string => typeof genre === 'string')
      : [];
    if (genres.length === 0) {
      event.sender.send('send-init-response', {
        ranking: undefined,
        view: undefined,
        errors: ['ジャンル情報が不正です'],
      });
      return;
    }

    try {
      const network = readNetworkSettings();
      const client = axios.create({
        auth: { username: network.basic_auth_user, password: network.basic_auth_pass },
        timeout: 5000,
      });
      const [ranking, view] = await Promise.all([
        client.post(`${network.server_address}/ranking/get-genre-ranking`, { genres }),
        client.post(`${network.server_address}/game/get-all-view-counter`, { genres }),
      ]);
      event.sender.send('send-init-response', {
        ranking: ranking.data,
        view: view.data,
        errors: [],
      });
    } catch (error) {
      const detail = errorDetail(error);
      console.error('Initial API request failed:', detail);
      event.sender.send('send-init-response', {
        ranking: undefined,
        view: undefined,
        errors: [detail],
      });
      event.sender.send('app-error', {
        message: 'ランキングサーバーに接続できません。ローカル表示を使用します',
        detail,
      });
    }
  });

  ipcMain.on('add-view-counter-request', async (event, arg: { title?: unknown }) => {
    if (typeof arg?.title !== 'string' || !arg.title.trim()) {
      event.sender.send('add-view-counter-response', {
        ok: false,
        error: { code: 'BAD_REQUEST', message: 'ゲームタイトルが不正です' },
      });
      return;
    }

    try {
      const network = readNetworkSettings();
      const response = await axios.put(
        `${network.server_address}/game/add-view-counter`,
        { title: arg.title },
        {
          auth: { username: network.basic_auth_user, password: network.basic_auth_pass },
          timeout: 5000,
        },
      );
      event.sender.send('add-view-counter-response', response.data);
    } catch (error) {
      const detail = errorDetail(error);
      console.error(`View counter update failed for ${arg.title}:`, detail);
      event.sender.send('add-view-counter-response', {
        ok: false,
        error: { code: 'API_ERROR', message: detail },
      });
    }
  });

  ipcMain.on('set-visitor-request', async (event, arg: { num?: unknown }) => {
    if (!Number.isInteger(arg?.num) || (arg.num as number) < 1 || (arg.num as number) > 5) {
      event.sender.send('set-visitor-response', {
        ok: false,
        error: { code: 'BAD_REQUEST', message: '来場者数は1〜5で指定してください' },
      });
      return;
    }

    const visitorCount = arg.num as number;
    const localDurationSeconds = readLocalTimerSeconds();
    try {
      const network = readNetworkSettings();
      const client = axios.create({
        auth: { username: network.basic_auth_user, password: network.basic_auth_pass },
        timeout: 5000,
      });
      const [visitorResult, settingsResult] = await Promise.allSettled([
        client.put(`${network.server_address}/visitor/add-visitor`, {
          title: 'main',
          add: visitorCount,
        }),
        client.get(`${network.server_address}/session/settings`),
      ]);

      let offlineSaved = false;
      const warnings: string[] = [];
      if (visitorResult.status === 'rejected') {
        saveOfflineVisitors(visitorCount);
        offlineSaved = true;
        warnings.push(`来場者数は端末に保存しました: ${errorDetail(visitorResult.reason)}`);
      }

      let durationSeconds = localDurationSeconds;
      let durationSource: 'server' | 'local' = 'local';
      if (settingsResult.status === 'fulfilled') {
        const value = settingsResult.value.data?.data?.durationSeconds;
        if (Number.isInteger(value) && value >= 30 && value <= 3600) {
          durationSeconds = value;
          durationSource = 'server';
        } else {
          warnings.push('サーバーの体験時間が不正なため、端末設定を使用します');
        }
      } else {
        warnings.push(`体験時間を取得できないため、端末設定を使用します: ${errorDetail(settingsResult.reason)}`);
      }

      event.sender.send('set-visitor-response', {
        ok: warnings.length === 0,
        offlineSaved,
        durationSeconds,
        durationSource,
        warnings,
      });
      if (durationSource === 'local') {
        event.sender.send('app-error', {
          message: `体験時間は端末設定の${durationSeconds}秒を使用します`,
          detail: warnings.join('\n'),
        });
      }
    } catch (error) {
      const detail = errorDetail(error);
      saveOfflineVisitors(visitorCount);
      console.error('Session initialization failed; using local settings:', detail);
      event.sender.send('set-visitor-response', {
        ok: false,
        offlineSaved: true,
        durationSeconds: localDurationSeconds,
        durationSource: 'local',
        warnings: [detail],
        error: { code: 'API_ERROR', message: detail },
      });
      event.sender.send('app-error', {
        message: `サーバーに接続できないため、体験時間は${localDurationSeconds}秒です`,
        detail,
      });
    }
  });
};
