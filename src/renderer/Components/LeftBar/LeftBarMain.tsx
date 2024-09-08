import React, { useContext, useEffect } from 'react';
import "./LeftBarMain.css"
import icon from '../../../../assets/img/0b3ec145cce25a1a.png'
import GenreButton from './GenreButton/GenreButton';

import icon1 from "../../../../assets/img/game_2_fill.svg"
import icon2 from "../../../../assets/img/rocket_fill.svg"
import icon3 from "../../../../assets/img/map_fill.svg"
import icon4 from "../../../../assets/img/film_fill.svg"
import icon5 from "../../../../assets/img/aiming_line.svg"
import icon6 from "../../../../assets/img/compass_3_fill.svg"
import icon7 from "../../../../assets/img/bling_fill (1).svg"
import TimerMain from './Timer/TimerMain';
import { GameListContext } from '../../App';

export const genresIconList = {
  latest:icon7,
  action:icon2,
  command:icon1,
  shooting:icon5,
  table:icon3,
  other:icon6
}
function LeftBarMain() {
  const dataContext = useContext<any>(GameListContext)
  useEffect(()=>{
    console.log(dataContext)
  },[dataContext.loadFlg])
  return (
    <div className='leftBar'>
        <div className="mainIcon">
            <img src={icon} alt="" className="mainIconImg"/>
            <div className="leftBarTitle">
                <span className="leftBarTitleText">GCC</span><br/>
                <span>Launcher</span>
            </div>
        </div>
        <div className="leftBarIcons">
          {
            dataContext.games.genres?dataContext.games.genres.map((i:"latest"|"action"|"command"|"shooting"|"table"|"other")=>{
              if (i === "action"){
                return <GenreButton icon={genresIconList.action} title={i[0].toUpperCase()+i.slice(1)} selected={true} />
              }else if (i === "command"){
                return <GenreButton icon={genresIconList.command} title={i[0].toUpperCase()+i.slice(1)} selected={false} />
              }else if (i === "latest"){
                return <GenreButton icon={genresIconList.latest} title={i[0].toUpperCase()+i.slice(1)} selected={true} />
              }else if (i === "other"){
                return <GenreButton icon={genresIconList.other} title={i[0].toUpperCase()+i.slice(1)} selected={false} />
              }else if (i === "shooting"){
                return <GenreButton icon={genresIconList.shooting} title={i[0].toUpperCase()+i.slice(1)} selected={false} />
              }else if (i === "table"){
                return <GenreButton icon={genresIconList.table} title={i[0].toUpperCase()+i.slice(1)} selected={false} />
              }
            }):<></>
          }
        </div>
        <TimerMain/>
    </div>
  )
}

export default LeftBarMain;
