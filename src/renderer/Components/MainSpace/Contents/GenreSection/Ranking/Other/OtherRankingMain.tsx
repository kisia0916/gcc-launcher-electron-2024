import React, { useContext } from 'react';
import DifficultMain from '../../../Difficult/DifficultMain';
import { HopUpContext } from '../../../../../../Pages/main/MainPage';
import ViewCounterMain from '../../../ViewCounter/ViewCounterMain';

function OtherRankingMain(props: {
  img1: string;
  icon1: string;
  title: string;
  profile: string;
  label: string;
  badgeClass: 'rank2' | 'pickup';
  place: string;
  view: number;
  project_type: string;
  diff: 'easy' | 'normal' | 'hard';
}) {
  const setHopUpWindow: any = useContext(HopUpContext);
  const {
    img1,
    icon1,
    title,
    profile,
    label,
    badgeClass,
    place,
    view,
    project_type: projectType,
    diff,
  } = props;
  const openGame = () =>
    setHopUpWindow({
      status: true,
      title,
      img: img1,
      profile,
      place,
      view,
      project_type: projectType,
      diff,
    });

  return (
    <div
      className="prmoRankingContents"
      onClick={openGame}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          openGame();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="prmoRankingContent">
        <img src={img1} alt="" className="prmoRankingContentImg" />
        <div className="prmoRankingContentTop">
          <div className={`promRankingContentRightNumber ${badgeClass}`}>
            <img
              src={icon1}
              className="promRankingContentRightNumberIcon"
              alt=""
            />
            <span className="promRankingContentRightNumberText">{label}</span>
          </div>
          <div className="promRankingContentRightNumberDiff diffNormal">
            {/* <img src={props.icon2} className="promRankingContentRightNumberDiffIcon" alt=""/> */}
            {/* <span>Easy</span> */}
            <ViewCounterMain view={view} size={2} />
          </div>
        </div>
        <div className="promRankingContentGameTitle">
          <div className="promRankingContentGameDiffIcon">
            <DifficultMain diff={diff} size={2} />
          </div>
          <span className="promRankingContentGameTitleText">{title}</span>
        </div>
      </div>
    </div>
  );
}

export default OtherRankingMain;
