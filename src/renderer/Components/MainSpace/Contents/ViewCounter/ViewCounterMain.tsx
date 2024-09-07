import React from 'react'
import "./ViewCounterMain.css"

import icon1 from "../../../../../../assets/img/eye_2_fill.svg"

function ViewCounterMain() {
  return (
    <div className='ViewCounterMain'>
        <img src={icon1} alt='' className='ViewCounterIcon'/>
        <span className='ViewCounterIconNum'>12</span>
    </div>
  )
}

export default ViewCounterMain