import fs from 'node:fs';
import path from 'node:path';
import type { ChildProcess } from 'node:child_process';
import childProcess from 'node:child_process';
import type { IpcMain } from 'electron';
import {
  generateGameJson,
  getLauncherRoot,
  resolveCatalogPaths,
} from '../initModules/initGameInfo';

const runningProcesses = new Map<string, ChildProcess>();

export interface GameLifecycleHandlers {
  onGameStarted: (title: string) => void;
  onAllGamesStopped: () => void;
}

let lifecycleHandlers: GameLifecycleHandlers | undefined;

const sendError = (event: Electron.IpcMainEvent, message: string, detail?: string) => {
  console.error(message, detail || '');
  event.sender.send('app-error', { message, detail });
};

export const stopAllGames = () => {
  for (const process of runningProcesses.values()) {
    if (!process.killed) process.kill();
  }
};

export const ipcModules = (ipcMain: IpcMain, handlers: GameLifecycleHandlers) => {
  lifecycleHandlers = handlers;
  ipcMain.on('load-games-data', (event) => {
    try {
      const { catalog, warnings } = generateGameJson();
      warnings.forEach((warning) => console.warn(`[catalog] ${warning}`));
      event.sender.send('load-games-data', {
        ok: true,
        data: resolveCatalogPaths(catalog),
        warnings,
      });
      if (warnings.length > 0) {
        sendError(event, `${warnings.length}件のゲームを読み込めませんでした`, warnings.join('\n'));
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      sendError(event, 'ゲーム一覧の生成に失敗しました', detail);
      event.sender.send('load-games-data', {
        ok: false,
        error: { code: 'CATALOG_ERROR', message: detail },
      });
    }
  });

  ipcMain.on('run_game', (event, arg: {
    game_path?: unknown,
    processId?: unknown,
    title?: unknown,
  }) => {
    if (
      typeof arg?.game_path !== 'string'
      || typeof arg?.processId !== 'string'
      || typeof arg?.title !== 'string'
    ) {
      sendError(event, 'ゲームを起動できませんでした', '起動要求の形式が不正です');
      return;
    }

    const gamePath = path.resolve(arg.game_path);
    const gamesRoot = path.resolve(getLauncherRoot(), 'launcher-game', 'games');
    if (!gamePath.startsWith(`${gamesRoot}${path.sep}`)) {
      sendError(event, 'ゲームを起動できませんでした', 'ゲームフォルダ外のパスが指定されました');
      event.sender.send('close-game-process', { processId: arg.processId, project_type: 'exe' });
      return;
    }
    if (!fs.existsSync(gamePath) || !fs.statSync(gamePath).isFile()) {
      sendError(event, 'ゲームを起動できませんでした', `ファイルがありません: ${gamePath}`);
      event.sender.send('close-game-process', { processId: arg.processId, project_type: 'exe' });
      return;
    }

    stopAllGames();
    const gameProcess = childProcess.spawn(gamePath, [], { cwd: path.dirname(gamePath) });
    runningProcesses.set(arg.processId, gameProcess);

    gameProcess.once('spawn', () => {
      lifecycleHandlers?.onGameStarted(arg.title as string);
    });

    gameProcess.once('error', (error) => {
      const wasRunning = runningProcesses.delete(arg.processId as string);
      sendError(event, 'ゲームのプロセスを開始できませんでした', error.message);
      event.sender.send('close-game-process', { processId: arg.processId, project_type: 'exe' });
      if (wasRunning && runningProcesses.size === 0) lifecycleHandlers?.onAllGamesStopped();
    });
    gameProcess.once('close', (code, signal) => {
      const wasRunning = runningProcesses.delete(arg.processId as string);
      console.log(`Game process closed: ${gamePath}`, { code, signal });
      if (!event.sender.isDestroyed()) {
        event.sender.send('close-game-process', { processId: arg.processId, project_type: 'exe' });
      }
      if (wasRunning && runningProcesses.size === 0) lifecycleHandlers?.onAllGamesStopped();
    });
  });

  ipcMain.on('close-game-process', (event, arg: { project_type?: string }) => {
    event.sender.send('close-game-process', { processId: '', project_type: arg?.project_type });
  });
  ipcMain.on('end-session', () => stopAllGames());
  ipcMain.on('stop-current-game', () => stopAllGames());
  ipcMain.on('select-genre', (event, arg: { genre?: string }) => {
    if (typeof arg?.genre === 'string') {
      event.sender.send('select-genre', { genre: arg.genre });
    }
  });
};
