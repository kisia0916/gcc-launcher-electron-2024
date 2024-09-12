import React, { useEffect, useState } from 'react'
import "./GenreSectionMain.css"
import icon from "../../../../../../assets/img/game_2_fill.svg"
import RankingMain from './Ranking/RankingMain'
import GameMain from '../Game/GameMain'

import game1 from "../../../../../../assets/games/15br-bplaunch-egs-s3-2560x1440-2560x1440-687570387.jpg"
import game2 from "../../../../../../assets/games/2214258.jpg"
import game3 from "../../../../../../assets/games/apex_legends_main_art_2.jpg"
import game5 from "../../../../../../assets/games/bf.jpg"
import game6 from "../../../../../../assets/games/header.jpg"
import game7 from "../../../../../../assets/games/How-to-play-Krunker.jpg"
import game8 from "../../../../../../assets/games/zzkn3KqNHGrckL1FrIoMfOKRZ3CCPjsXBdkvMDKhHDlF2cZFSiBbi0r5nL0qZsTK3mDDtIXhNenGPmuk.jpg"
import game9 from "../../../../../../assets/games/wp8484599.jpg"
import game10 from "../../../../../../assets/games/8-22.jpg"
import game11 from "../../../../../../assets/games/WS000059.jpg"



function GenreSectionMain(props:{genreTitle:string,genreGames:any,ranking:any}) {
  const [rankGames,setRankGames] = useState<any>("")
  const [allGames,setAllGames] = useState<any>("")
  useEffect(()=>{
    console.log(props.genreGames)
    console.log(props.ranking)
    if (props.genreGames){
      if (props.genreGames.length > 0){
        let rankGameList:any[] = []
        for (let i = 0;3>i;i++){
          rankGameList = [...rankGameList,props.genreGames[i]]
        }
        console.log(rankGameList)
        setRankGames(props.ranking)
        setAllGames(props.genreGames)
      }
    }

  },[props.genreGames])
  return (
    <>
        <div className="gameSectionTop">
            <img src={icon} alt="" className={`gameSectionTopIcon ${props.genreTitle}`}/>
            <span className="gameSectionTitle">{props.genreTitle}</span>
        </div>
        <div className="promoMain">
            <RankingMain games={rankGames}/>
        </div>
        <div className='gamesMain'>
            {allGames?allGames.map((i:any)=>{
              return <GameMain img={i.thumbnail} title={i.title} profile={i.readme} place={i.place} view={i.view} project_type={i.project_type}/>
            }):<></>}
        </div>
    </>
  )
}

export default GenreSectionMain