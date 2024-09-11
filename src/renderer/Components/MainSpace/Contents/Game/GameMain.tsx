import React, { useContext, useRef } from 'react'
import "./GameMain.css"
import { HopUpContext } from '../../../../Pages/main/MainPage'
import ViewIconMain from './ViewIcon/ViewIconMain'

import diffIcon from "../../../../../../assets/img/XRP_line4.svg"

function GameMain(props:{img:string,title:string,profile:string,place:string,view:number}) {
    const setHopUpWindow:any = useContext(HopUpContext)
    return (
    <div className="gameMainContentMain" onClick={()=>setHopUpWindow({status:true,title:props.title,img:props.img,profile:props.profile,place:props.place,view:props.view})}>
        <div className="gameMainContent">
            <div className='gameMainContentSpace'>
                <ViewIconMain view={props.view}/>
                <img src={props.img} className="gameMainContentImg" alt=""/>
            </div>
            {/* <span className="gameMainContentTitle">{props.title}</span> */}
            <div className='gameMainContentInfo'>
                <img src={diffIcon}alt='' className='gameMainContentDiff'/>
                <span className='gameMainContentTitle'>{props.title}</span>
            </div>
        </div>
    </div>
  )
}

export default GameMain