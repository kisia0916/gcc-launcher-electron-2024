import React from 'react';
import "./LeftBarMain.css"
import icon from '../../../../assets/img/0b3ec145cce25a1a.png'
import GenreButton from './GenreButton/GenreButton';

import icon1 from "../../../../assets/img/game_2_fill.svg"
import icon2 from "../../../../assets/img/rocket_fill.svg"
import icon3 from "../../../../assets/img/map_fill.svg"
import icon4 from "../../../../assets/img/film_fill.svg"

function LeftBarMain() {
  return (
    <div className='leftBar'>
        <div className="mainIcon">
            <img src={icon} alt="" className="mainIconImg"/>
            <div className="leftBarTitle">
                <span className="leftBarTitleText">GCC</span><br/>
                <span>Luncher</span>
            </div>
        </div>
        <div className="leftBarIcons">
          <GenreButton icon={icon1} title='Latest' selected={false}/>
          <GenreButton icon={icon2} title='Action' selected={false}/>
          <GenreButton icon={icon3} title='Card' selected={false}/>
          <GenreButton icon={icon4} title='Anime' selected={false}/>


        </div>
    </div>
  )
}

export default LeftBarMain;
