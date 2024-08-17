import React, { useContext } from 'react'
import "./RankingMain.css"

import img1 from "../../../../../../../assets/games/15br-bplaunch-egs-s3-2560x1440-2560x1440-687570387.jpg"
import img2 from "../../../../../../../assets/games/valorant-agents-maps-weapons-beta.jpg"
import img3 from "../../../../../../../assets/games/2214258.jpg"

import icon1 from "../../../../../../../assets/img/bling_fill.svg"
import icon2 from "../../../../../../../assets/img/play_fill.svg"
import icon3 from "../../../../../../../assets/img/XRP_line (1).svg"
import icon4 from "../../../../../../../assets/img/bling_fill (2).svg"
import icon5 from "../../../../../../../assets/img/bling_fill (3).svg"
import MainSpaceButtonMain from '../../Buttons/MainSpaceButtonMain'
import DifficultMain from '../../Difficult/DifficultMain'
import { HopUpContext } from '../../../../../Pages/main/MainPage'


function RankingMain() {
  const setHopUpWindow:any = useContext(HopUpContext)
  return (
    <div className="prmoMainContents">
        <div className="prmoMainGame">
            <img src={img1} className="promGameImg" alt=""/>
            <div className="promRankNum rank1">
                <img src={icon1} className="promRankIcon" alt=""/>
                <span className="promRankText">人気No.1</span>
            </div>
            <div className="promMainGameTitle">
                <span className="promMainGameTitleText">Fortnite</span>
                <div className="promMainGameProfile">
                    <span>フォートナイトは、100人が一つの島に降り立って、武器を拾ったり建築したりしながら、最後の一人を目指して戦うバトルロイヤルゲーム。派手なスキンやダンス、友達とチームを組んで遊ぶのも楽しい要素。建築とバトルの駆け引きが熱い人気タイトル！</span>
                </div>
                <div className="promMainGameButtonMain">
                    <MainSpaceButtonMain/>
                    <DifficultMain/>
                </div>
            </div>
        </div>
        <div className="prmoRankings">
            <div className="prmoRankingContents" onClick={()=>setHopUpWindow({status:true,title:"Valorant",img:img2})}>
                <div className="prmoRankingContent">
                <img src={img2} alt="" className="prmoRankingContentImg"/>
                <div className="prmoRankingContentTop">
                    <div className="promRankingContentRightNumber rank2">
                        <img src={icon4} className="promRankingContentRightNumberIcon" alt=""/>
                        <span className="promRankingContentRightNumberText">人気No.2</span>
                    </div>
                    <div className="promRankingContentRightNumberDiff diffNormal">
                        <img src={icon3} className="promRankingContentRightNumberDiffIcon" alt=""/>
                        <span>Easy</span>
                    </div>
                </div>
                <span className="promRankingContentGameTitle">Valorant</span>
                </div>
            </div>
            <div className="prmoRankingContents" onClick={()=>setHopUpWindow({status:true,title:"Osu!",img:img3})}>
                <div className="prmoRankingContent">
                <img src={img3} alt="" className="prmoRankingContentImg"/>
                <div className="prmoRankingContentTop">
                    <div className="promRankingContentRightNumber rank3">
                        <img src={icon5} className="promRankingContentRightNumberIcon" alt=""/>
                        <span className="promRankingContentRightNumberText">人気No.3</span>
                    </div>
                    <div className="promRankingContentRightNumberDiff diffNormal">
                        <img src={icon3} className="promRankingContentRightNumberDiffIcon" alt=""/>
                        <span>Easy</span>
                    </div>
                </div>
                <span className="promRankingContentGameTitle">Osu!</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RankingMain