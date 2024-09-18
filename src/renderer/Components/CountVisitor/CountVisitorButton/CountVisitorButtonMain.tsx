import React, { useContext, useEffect, useState } from 'react'
import "./CountVisitorButtonMain.css"
import { Navigate } from 'react-router-dom'

function CountVisitorButtonMain(props:{num:number,color:string,setFlg:any,Flg:boolean}) {
  const pushFunction = ()=>{
    if (!props.Flg){
      window.electron.ipcRenderer.sendMessage("set-visitor-request",{num:props.num})
      props.setFlg(true)
    }
  }

  return (
    <>
      <button className={`CountVisitorButtonMains ${props.color}`} onClick={pushFunction}>{props.num}</button>
    </>
  )
}

export default CountVisitorButtonMain