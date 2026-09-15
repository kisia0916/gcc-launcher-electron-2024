import { createContext, useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import EndPageMain from './Pages/endPage/EndPageMain';
import MainPage from './Pages/main/MainPage';
import GameOverlay from './Pages/overlay/GameOverlay';
import './App.css';

export const GameListContext = createContext<{ games: any, loadFlg: boolean } | string>('');

interface AppError {
  message: string;
  detail?: string;
}

function LauncherApp() {
  const [games, setGames] = useState<any>('');
  const [doneFirstLoad, setDoneFirstLoad] = useState(false);
  const [appError, setAppError] = useState<AppError | null>(null);

  useEffect(() => {
    const removeGamesListener = window.electron.ipcRenderer.on('load-games-data', (arg: any) => {
      if (arg?.ok && arg.data) {
        setGames(arg.data);
      } else {
        setAppError({
          message: 'ゲーム一覧を読み込めませんでした',
          detail: arg?.error?.message,
        });
      }
      setDoneFirstLoad(true);
    });
    const removeErrorListener = window.electron.ipcRenderer.on('app-error', (arg: any) => {
      setAppError({
        message: arg?.message || '予期しないエラーが発生しました',
        detail: arg?.detail,
      });
    });

    window.electron.ipcRenderer.sendMessage('load-games-data', '');
    return () => {
      removeGamesListener();
      removeErrorListener();
    };
  }, []);

  useEffect(() => {
    if (!appError) return undefined;
    const timeout = window.setTimeout(() => setAppError(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [appError]);

  return (
    <GameListContext.Provider value={{ games, loadFlg: doneFirstLoad }}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/end" element={<EndPageMain />} />
        </Routes>
      </Router>
      {appError && (
        <button
          type="button"
          className="appErrorNotice"
          onClick={() => setAppError(null)}
          title={appError.detail}
        >
          <span>{appError.message}</span>
          <small>タップで閉じる（5秒後に自動で閉じます）</small>
        </button>
      )}
    </GameListContext.Provider>
  );
}

export default function App() {
  const isOverlay = new URLSearchParams(window.location.search).get('overlay') === '1';
  return isOverlay ? <GameOverlay /> : <LauncherApp />;
}
