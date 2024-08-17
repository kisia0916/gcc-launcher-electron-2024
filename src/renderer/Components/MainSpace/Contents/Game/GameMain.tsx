import React, { useContext, useRef } from 'react'
import "./GameMain.css"
import { HopUpContext } from '../../../../Pages/main/MainPage'
import HopUpWindowMain from '../../../HopUpWindow/HopUpWindowMain'



function GameMain(props:{img:string,title:string}) {
    const setHopUpWindow:any = useContext(HopUpContext)

    return (
    <div className="gameMainContentMain" onClick={()=>setHopUpWindow({status:true,title:props.title,img:props.img})}>
        <div className="gameMainContent">
            <img src={props.img} className="gameMainContentImg" alt=""/>
            <span className="gameMainContentTitle">{props.title}</span>
        </div>
    </div>
  )
}

export default GameMain