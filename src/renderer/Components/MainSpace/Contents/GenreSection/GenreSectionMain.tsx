import React from 'react'
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



function GenreSectionMain(props:{genreTitle:string}) {
  return (
    <>
        <div className="gameSectionTop">
            <img src={icon} alt="" className="gameSectionTopIcon"/>
            <span className="gameSectionTitle">{props.genreTitle}</span>
        </div>
        <div className="promoMain">
            <RankingMain/>
        </div>
        <div className='gamesMain'>
              <GameMain img={game3} title='APEX LEGENDS'/>
              <GameMain img={game5} title='BATTLE FIELD 2042'/>
              <GameMain img={game6} title='MONSTER HUNTER'/>
              <GameMain img={game7} title='Krunker.io'/>
              <GameMain img={game8} title='Genshin Impact'/>
              <GameMain img={game9} title='Minecraft'/>
              <GameMain img={game10} title='PUBG'/>
              <GameMain img={game11} title='LEAGUE of LEGENDS'/>
        </div>
    </>
  )
}

export default GenreSectionMain