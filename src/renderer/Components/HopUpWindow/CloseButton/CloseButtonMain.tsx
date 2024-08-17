import React, { useContext } from 'react'
import "./CloseButtonMain.css"
import icon from "../../../../../assets/img/close_line.svg"
import { HopUpContext } from '../../../Pages/main/MainPage'

function CloseButtonMain() {
  const setHopUpWindow:any = useContext(HopUpContext)
  return (
      <div className='CloseButtonMain' onClick={()=>setHopUpWindow({status:false,title:"",img:""})}>
          <img src={icon} className='CloseButtonMainIcon' alt=''/>
      </div>
  )
}

export default CloseButtonMain