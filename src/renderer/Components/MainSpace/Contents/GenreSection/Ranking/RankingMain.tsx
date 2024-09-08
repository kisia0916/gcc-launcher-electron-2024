import React, { useContext, useEffect, useState } from 'react'
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
import { GameListContext } from '../../../../../App'
import OtherRankingMain from './Other/OtherRankingMain'
import Rank1Main from './Rank1/Rank1Main'


function RankingMain(props:{games:[rank1:any,rank2:any,rank3:any]}) {
  const setHopUpWindow:any = useContext(HopUpContext)
  useEffect(()=>{
    console.log(props.games)
  },[props.games])
  return (
    props.games.length>0?<div className="prmoMainContents">
        <Rank1Main img1={props.games[0].thumbnail} icon1={icon1} title={props.games[0].title} profile={props.games[0].readme} place={props.games[0].place}/>
        <div className="prmoRankings">
            <OtherRankingMain img1={props.games[1].thumbnail} icon1={icon4} icon2={props.games[1].icon2} title={props.games[1].title} profile={props.games[1].readme} rank={2} place={props.games[1].place}/>
            <OtherRankingMain img1={props.games[2].thumbnail} icon1={icon5} icon2={props.games[2].icon2} title={props.games[2].title} profile={props.games[2].readme} rank={3} place={props.games[2].place}/>
        </div>
    </div>:<></>
  )
}

export default RankingMain