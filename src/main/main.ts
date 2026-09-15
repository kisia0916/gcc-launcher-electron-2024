/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Menu, screen, globalShortcut } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { ipcModules, stopAllGames } from './ipcModules/ipcMain';
import { generateGameJson } from './initModules/initGameInfo';
import { apiRequestMain } from './networkModules/apiRequestsMain';
import { get_timer_info } from './timer/timerMain';


let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;
let overlayState = {
  gameRunning: false,
  gameTitle: '',
  remainingSeconds: null as number | null,
  expired: false,
};

const sendOverlayState = () => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.webContents.send('overlay-state', overlayState);
  }
};

const showGameOverlay = (gameTitle: string) => {
  overlayState = { ...overlayState, gameRunning: true, gameTitle };
  mainWindow?.setIgnoreMouseEvents(true);
  sendOverlayState();
  overlayWindow?.showInactive();
};

const restoreLauncherInteraction = () => {
  overlayState = { ...overlayState, gameRunning: false, gameTitle: '' };
  overlayWindow?.hide();
  mainWindow?.setIgnoreMouseEvents(false);
  mainWindow?.focus();
};

ipcMain.on('session-timer-update', (_event, arg: { remainingSeconds?: unknown }) => {
  if (Number.isInteger(arg?.remainingSeconds) && (arg.remainingSeconds as number) >= 0) {
    const remainingSeconds = arg.remainingSeconds as number;
    overlayState = {
      ...overlayState,
      remainingSeconds,
      expired: remainingSeconds === 0,
    };
    sendOverlayState();
  }
});

ipcMain.on('session-expired', () => {
  overlayState = { ...overlayState, remainingSeconds: 0, expired: true };
  sendOverlayState();
  if (overlayState.gameRunning) overlayWindow?.showInactive();
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});
ipcMain.on('close-app',(event,arg)=>{
  app.quit();
})
ipcMain.on('max-app',(event,arg)=>{
  mainWindow?.maximize();
})
ipcMain.on('min-app',(event,arg)=>{
  mainWindow?.minimize();
})


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};


const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    show: false,
    // width: 1024,
    // height: 728,
    // minHeight:900,
    // minWidth:1530,
    width: width,
    height: height,
    minHeight:height,
    minWidth:width,
    icon: getAssetPath('0b3ec145cce25a1a.png'),
    frame:false,
    fullscreen: true,    
    titleBarStyle: "hidden",
    type:"desktop",
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      webSecurity:false,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const overlayUrl = new URL(resolveHtmlPath('index.html'));
  overlayUrl.searchParams.set('overlay', '1');
  const workArea = screen.getPrimaryDisplay().workArea;
  overlayWindow = new BrowserWindow({
    show: false,
    width: 280,
    height: 82,
    x: workArea.x + workArea.width - 292,
    y: workArea.y + 12,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      contextIsolation: true,
    },
  });
  overlayWindow.setAlwaysOnTop(true, 'screen-saver');
  overlayWindow.loadURL(overlayUrl.href);
  overlayWindow.webContents.on('did-finish-load', sendOverlayState);
  overlayWindow.on('closed', () => {
    overlayWindow = null;
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  globalShortcut.register('F8', () => {
    if (mainWindow) {
        mainWindow.reload();
    }
});
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  Menu.setApplicationMenu(null)
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  stopAllGames();
  globalShortcut.unregisterAll();
});

app
  .whenReady()
  .then(() => {
    try {
      const result = generateGameJson();
      result.warnings.forEach((warning) => console.warn(`[catalog] ${warning}`));
    } catch (error) {
      console.error('Failed to generate game catalog at startup', error);
    }
    ipcModules(ipcMain, {
      onGameStarted: showGameOverlay,
      onAllGamesStopped: restoreLauncherInteraction,
    });
    apiRequestMain(ipcMain);
    get_timer_info(ipcMain);
    createWindow();
    // mainWindow?.setAlwaysOnTop(true, 'screen-saver'); 
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
