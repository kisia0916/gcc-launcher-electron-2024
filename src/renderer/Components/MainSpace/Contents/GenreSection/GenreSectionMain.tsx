import React from 'react';
import './GenreSectionMain.css';
import icon from '../../../../../../assets/img/game_2_fill.svg';
import RankingMain from './Ranking/RankingMain';
import GameMain from '../Game/GameMain';

function GenreSectionMain(props: {
  genreTitle: string;
  genreGames: any[];
  ranking: any[];
  pickup: any | null;
}) {
  const { genreTitle, genreGames, ranking, pickup } = props;

  return (
    <>
      <div className="gameSectionTop">
        <img src={icon} alt="" className={`gameSectionTopIcon ${genreTitle}`} />
        <span className="gameSectionTitle">{genreTitle}</span>
      </div>
      <div className="promoMain">
        <RankingMain games={ranking} pickup={pickup} />
      </div>
      <div className="gamesMain">
        {genreGames.map((i: any) => {
          return (
            <GameMain
              key={i.title}
              img={i.thumbnail}
              title={i.title}
              profile={i.readme}
              place={i.place}
              view={i.view}
              project_type={i.project_type}
              diff={i.diff}
            />
          );
        })}
      </div>
    </>
  );
}

export default GenreSectionMain;
