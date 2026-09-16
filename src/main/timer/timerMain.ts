import fs from 'node:fs';
import path from 'node:path';
import type { IpcMain } from 'electron';
import { getLauncherRoot } from '../initModules/initGameInfo';

const readTimerSeconds = () => {
  const settingsPath = path.join(getLauncherRoot(), 'launcher-settings.json');
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')) as { timer?: unknown };
  if (!Number.isInteger(settings.timer) || (settings.timer as number) <= 0) {
    throw new Error('launcher-settings.json の timer は正の整数で指定してください');
  }
  return settings.timer as number;
};

export const get_timer_info = (ipcMain: IpcMain) => {
  ipcMain.on('get-timer-info', (event) => {
    try {
      event.sender.send('get-timer-info', readTimerSeconds());
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error('Failed to read timer setting:', detail);
      event.sender.send('app-error', { message: 'タイマー設定を読み込めませんでした', detail });
      event.sender.send('get-timer-info', 360);
    }
  });
};
