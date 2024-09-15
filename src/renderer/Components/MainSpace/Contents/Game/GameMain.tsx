import React, { useContext, useRef } from 'react'
import "./GameMain.css"
import { HopUpContext } from '../../../../Pages/main/MainPage'
import ViewIconMain from './ViewIcon/ViewIconMain'

import diffIcon from "../../../../../../assets/img/XRP_line4.svg"
import DifficultMain from '../Difficult/DifficultMain'

function GameMain(props:{img:string,title:string,profile:string,place:string,view:number,project_type:string,diff:"easy"|"normal"|"hard"}) {
    const setHopUpWindow:any = useContext(HopUpContext)
    return (
    <div className="gameMainContentMain" onClick={()=>setHopUpWindow({status:true,title:props.title,img:props.img,profile:props.profile,place:props.place,view:props.view,project_type:props.project_type,diff:props.diff})}>
        <div className="gameMainContent">
            <div className='gameMainContentSpace'>
                <ViewIconMain view={props.view}/>
                <img src={props.img} className="gameMainContentImg" alt=""/>
            </div>
            {/* <span className="gameMainContentTitle">{props.title}</span> */}
            <div className='gameMainContentInfo'>
                {/* <img src={diffIcon}alt='' className='gameMainContentDiff'/> */}
                <div className='gameMainContentDiff'>
                    <DifficultMain diff={props.diff} size={2}/>
                </div>
                <span className='gameMainContentTitle'>{props.title}</span>
            </div>
        </div>
    </div>
  )
}

export default GameMain