import React, { useContext, useEffect, useState } from 'react'
import "./HopUpWindowMain.css"

import game1 from "../../../../assets/games/apex_legends_main_art_2.jpg"
import MainSpaceButtonMain from '../MainSpace/Contents/Buttons/MainSpaceButtonMain'
import DifficultMain from '../MainSpace/Contents/Difficult/DifficultMain'
import CloseButtonMain from './CloseButton/CloseButtonMain'
import { HopUpContext } from '../../Pages/main/MainPage'
import ViewIconMain from '../MainSpace/Contents/Game/ViewIcon/ViewIconMain'
import ViewCounterMain from '../MainSpace/Contents/ViewCounter/ViewCounterMain'

function HopUpWindowMain(props:{title:string,img:string,profile:string,place:string,view:number}) {
  const [ishoverFlg,setIshoverFlg] = useState(false)
  const setHopUpWindow:any = useContext(HopUpContext)
  const closeHopUpWindow = ()=>{
    if (!ishoverFlg){
        setHopUpWindow({status:false,title:"",img:""})
    }
  }
  return (
    <div className='gamePreviewSpace' onClick={()=>closeHopUpWindow()}>
      <div className='hopUpWindowMain' onMouseEnter={()=>setIshoverFlg(true)} onMouseLeave={()=>setIshoverFlg(false)}>
          <img src={props.img} className='hopUpWindowMainImg' alt=''/>
          <div className='hopUpWindowMainGameProfileTop'>
                  <div></div>
                  <CloseButtonMain/>
          </div>
          <div className='hopUpWindowMainInfo'>
              <div className='hopUpWindowMainTitle'>
                <div className='hopUpWindowMainDiff'>
                  <DifficultMain diff={1}/>
                </div>
                <span className='hopUpWindowMainTitleText'>{props.title}</span><br/>
              </div>
              <div className='hopUpWindowMainGameProfile'>
                <span>{props.profile}</span>
              </div>
              <div className='hopUpWindowMainGameProfileButtons'>
                    <div className='hopUpWindowMainGameProfileButtonsPlay'>
                      <MainSpaceButtonMain game_path={props.place} title={props.title}/>
                    </div>
                    <ViewCounterMain view={props.view}/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default HopUpWindowMain