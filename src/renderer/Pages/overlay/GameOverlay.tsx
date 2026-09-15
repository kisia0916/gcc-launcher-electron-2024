import { useEffect, useState } from 'react';
import './GameOverlay.css';

interface OverlayState {
  gameRunning: boolean;
  gameTitle: string;
  remainingSeconds: number | null;
  expired: boolean;
}

const initialState: OverlayState = {
  gameRunning: false,
  gameTitle: '',
  remainingSeconds: null,
  expired: false,
};

const formatTime = (seconds: number | null) => {
  if (seconds === null) return '--:--';
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export default function GameOverlay() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    document.body.classList.add('overlayBody');
    const removeListener = window.electron.ipcRenderer.on('overlay-state', (nextState: any) => {
      setState(nextState as OverlayState);
    });
    return () => {
      document.body.classList.remove('overlayBody');
      removeListener();
    };
  }, []);

  return (
    <main className={`gameOverlay ${state.expired ? 'expired' : ''}`}>
      <div className="gameOverlayStatus">
        {state.expired ? (
          <>
            <strong>体験時間が終了しました。</strong>
            <span>区切りのよいところで交代をお願いします。</span>
          </>
        ) : (
          <strong>残り {formatTime(state.remainingSeconds)}</strong>
        )}
      </div>
      <button
        type="button"
        className="gameOverlayStop"
        disabled={!state.gameRunning}
        onClick={() => window.electron.ipcRenderer.sendMessage('stop-current-game', '')}
      >
        <span>ゲーム終了</span>
        <small>ランチャーへ</small>
      </button>
    </main>
  );
}
