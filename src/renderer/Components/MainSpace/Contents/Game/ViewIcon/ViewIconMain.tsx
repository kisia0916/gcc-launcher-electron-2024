import React, { useContext, useRef } from 'react'
import "./ViewIconMain.css"
import icon1 from "../../../../../../../assets/img/eye_2_fill.svg"

function ViewIconMain(props:{view:number}) {
    return (
        <div className='ViewIconMain'>
            <img src={icon1} className='ViewIcon'/>
            <span className='ViewNum'>{props.view}</span>
        </div>
  )
}

export default ViewIconMain