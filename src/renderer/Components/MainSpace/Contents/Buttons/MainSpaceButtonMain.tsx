import React from 'react'
import "./MainSpaceButtonMain.css"
import icon2 from "../../../../../../assets/img/play_fill (1).svg"

function MainSpaceButtonMain() {
  return (
    <div className="promMainGameButton">
        <div className="promMainGameButtonMain">
            <img src={icon2} alt="" className="promMainGameButtonIcon"/>
            <span className="promMainGameButtonText">Play</span>
        </div>
    </div>
  )
}

export default MainSpaceButtonMain