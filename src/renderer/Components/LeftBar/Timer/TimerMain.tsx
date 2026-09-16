import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CountVisitorContext, LoadingScreenContext } from '../../../Pages/main/MainPage'
import './TimerMain.css'

function TimerMain() {
  const loadingContext:any = useContext(LoadingScreenContext)
  const countVisitorProvider:any = useContext(CountVisitorContext)
  const [nowTime,setNowTime] = useState<number>(-1)
  const [timerStarted,setTimerStarted] = useState(false)
  const [isEnd,setIsEnd] = useState(false)
  const isCounting = timerStarted && nowTime > 0

  useEffect(()=>{
    return window.electron.ipcRenderer.on('set-visitor-response',(arg:any)=>{
      if (Number.isInteger(arg?.durationSeconds) && arg.durationSeconds > 0) {
        setNowTime(arg.durationSeconds)
      }
    })
  },[])

  useEffect(()=>{
    if (!loadingContext.get && nowTime !== -1 && !countVisitorProvider.get) {
      setTimerStarted(true)
    }
  },[loadingContext.get,nowTime,countVisitorProvider.get])

  useEffect(()=>{
    if (!isCounting) return undefined
    const timer = setInterval(()=>setNowTime((time)=>Math.max(0,time-1)),1000)
    return ()=>clearInterval(timer)
  },[isCounting])

  useEffect(()=>{
    if (nowTime >= 0) {
      window.electron.ipcRenderer.sendMessage('session-timer-update',{remainingSeconds:nowTime})
    }
    if (nowTime === 0 && !isEnd) {
      window.electron.ipcRenderer.sendMessage('session-expired','')
      setIsEnd(true)
    }
  },[nowTime,isEnd])

  const minutes = nowTime < 0 ? 0 : Math.floor(nowTime/60)
  const seconds = nowTime < 0 ? '00' : String(nowTime%60).padStart(2,'0')

  return (
    <div className="leftBarBottomIcons">
      <div className="topBarTimer">
        <span className="topBarTimerText">{minutes}:{seconds}</span>
      </div>
      {isEnd?<Navigate to="/end"/>:<></>}
    </div>
  )
}

export default TimerMain
