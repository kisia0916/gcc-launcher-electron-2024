import React, { useContext, useEffect, useState } from 'react'
import "./LoadingScreenMain.css"
import icon from "../../../../assets/img/0b3ec145cce25a1a.png"
import { CountVisitorContext, LoadingScreenContext } from '../../Pages/main/MainPage'

function LoadingScreenMain() {
  const [testFlg,setTestFlg] = useState<boolean>(true)
  const loadingScreenProvider:any = useContext(LoadingScreenContext)
  const countVisitorProvider:any = useContext(CountVisitorContext)
    useEffect(()=>{
        window.electron.ipcRenderer.on("send-init-response",(arg:any)=>{
                setTestFlg(false)
                setTimeout(()=>{
                    loadingScreenProvider.set(false)
                    countVisitorProvider.set({state:true})
                },1000)
        })
    },[])
  return (
    <div className={`LoadingScreenMain ${!testFlg?"hidden":""}`}>
        <div className='LoadingScreenContent'>
            <img src={icon} className='LoadingScreenLogoIcon'/>
            <span className="LoadingScreenLoadText">Now Loading....</span>
        </div>
        <span className='LoadingScreenCredit'>Created by Fumiharu Abe</span>
    </div>
  )
}

export default LoadingScreenMain