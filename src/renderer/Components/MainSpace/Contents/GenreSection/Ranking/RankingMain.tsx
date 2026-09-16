import React from 'react';
import './RankingMain.css';

import icon1 from '../../../../../../../assets/img/bling_fill.svg';
import icon4 from '../../../../../../../assets/img/bling_fill (2).svg';
import icon5 from '../../../../../../../assets/img/bling_fill (3).svg';
import OtherRankingMain from './Other/OtherRankingMain';
import Rank1Main from './Rank1/Rank1Main';

function RankingMain(props: { games: any[]; pickup: any | null }) {
  const { games, pickup } = props;
  const rank1 = games[0];
  const rank2 = games[1];

  if (!rank1 && !rank2 && !pickup) {
    return null;
  }

  return (
    <div className="prmoMainContents">
      {rank1 ? (
        <Rank1Main
          img1={rank1.thumbnail}
          icon1={icon1}
          title={rank1.title}
          profile={rank1.readme}
          place={rank1.place}
          view={rank1.view}
          project_type={rank1.project_type}
          diff={rank1.diff}
        />
      ) : null}
      <div className="prmoRankings">
        {rank2 ? (
          <OtherRankingMain
            img1={rank2.thumbnail}
            icon1={icon4}
            title={rank2.title}
            profile={rank2.readme}
            label="人気No.2"
            badgeClass="rank2"
            place={rank2.place}
            view={rank2.view}
            project_type={rank2.project_type}
            diff={rank2.diff}
          />
        ) : null}
        {pickup ? (
          <OtherRankingMain
            img1={pickup.thumbnail}
            icon1={icon5}
            title={pickup.title}
            profile={pickup.readme}
            label="PICK UP"
            badgeClass="pickup"
            place={pickup.place}
            view={pickup.view}
            project_type={pickup.project_type}
            diff={pickup.diff}
          />
        ) : null}
      </div>
    </div>
  );
}

export default RankingMain;
