import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    (window as any).electron = {
      ipcRenderer: {
        on: jest.fn(() => jest.fn()),
        once: jest.fn(),
        sendMessage: jest.fn(),
      },
    };
    expect(render(<App />)).toBeTruthy();
  });

  it('automatically hides an error after five seconds and also closes it on tap', () => {
    jest.useFakeTimers();
    const listeners = new Map<string, (arg: any) => void>();
    (window as any).electron = {
      ipcRenderer: {
        on: jest.fn((channel: string, listener: (arg: any) => void) => {
          listeners.set(channel, listener);
          return jest.fn();
        }),
        once: jest.fn(),
        sendMessage: jest.fn(),
      },
    };

    render(<App />);
    act(() => listeners.get('app-error')?.({ message: 'タイマー取得エラー' }));
    expect(screen.getByText('タイマー取得エラー')).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(5000));
    expect(screen.queryByText('タイマー取得エラー')).not.toBeInTheDocument();

    act(() => listeners.get('app-error')?.({ message: 'もう一度エラー' }));
    fireEvent.click(screen.getByRole('button', { name: /もう一度エラー/ }));
    expect(screen.queryByText('もう一度エラー')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
