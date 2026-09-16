import React, { useContext, useEffect, useState } from 'react';
import './MainSpace.css';
import GenreSectionMain from './Contents/GenreSection/GenreSectionMain';
import { GameListContext } from '../../App';
import { selectPickupGame } from './pickupSelection';

const sortGame = (list: any, target: any) => {
  const returnData = target.map(() => {
    return '';
  });
  Object.entries(list).forEach(([key, value]: [string, any]) => {
    if (key !== 'genres') {
      const targetIndex = target.findIndex((i: string) => i === key);
      if (targetIndex !== -1) {
        returnData[targetIndex] = value;
      }
    }
  });
  return returnData;
};

function MainSpace() {
  const GameList = useContext<any>(GameListContext);
  const [genreList, setGenreList] = useState<any>([]);
  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      'select-genre',
      (arg: any) => {
        const scrollTarget = document.querySelector(`.${arg.genre}`);
        scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
    );
    return removeListener;
  }, []);
  useEffect(() => {
    if (GameList.games) {
      const genreContentList: string[] = GameList.games.genres;
      let gamesList: any[] = [];
      window.electron.ipcRenderer.sendMessage('send-init-request', {
        genres: genreContentList,
      });
      const removeListener = window.electron.ipcRenderer.on(
        'send-init-response',
        async (arg: any) => {
          const mainTargetList = sortGame(GameList.games, genreContentList);
          gamesList = genreContentList.map(() => {
            return '';
          });
          mainTargetList.forEach((i: any, index: number) => {
            const genre =
              genreContentList[index][0].toUpperCase() +
              genreContentList[index].slice(1);
            const viewByTitle = new Map(
              (arg.view?.data?.[index] ?? []).map((counter: any) => [
                counter.title,
                counter.counter,
              ]),
            );
            const returnGames = i.map((game: any) => ({
              ...game,
              view: viewByTitle.get(game.title) ?? 0,
            }));
            const rankingGames = arg.ranking
              ? (arg.ranking.data?.[index] ?? [])
                  .map((counter: any) => {
                    const game = i.find(
                      (item: any) => item.title === counter.title,
                    );

                    return game ? { ...game, view: counter.counter } : null;
                  })
                  .filter((game: any) => game !== null)
                  .slice(0, 2)
              : returnGames.slice(0, 2);
            const rankingTitles = new Set(
              rankingGames.map((game: any) => game.title),
            );
            const pickupCandidates = returnGames.filter(
              (game: any) => !rankingTitles.has(game.title),
            );
            const pickupGame = selectPickupGame(pickupCandidates);

            returnGames.sort((a: any, b: any) => b.view - a.view);
            gamesList[index] = (
              <GenreSectionMain
                key={genre}
                genreTitle={genre}
                genreGames={returnGames}
                ranking={rankingGames}
                pickup={pickupGame ?? null}
              />
            );
          });
          setGenreList(gamesList);
        },
      );
      return removeListener;
    }
    return undefined;
  }, [GameList.games]);
  return (
    <div className="mainScreen">
      <div>
        {genreList.map((i: any) => {
          return i;
        })}
      </div>
      <div style={{ width: '100%', height: '30px' }} />
    </div>
  );
}

export default MainSpace;
