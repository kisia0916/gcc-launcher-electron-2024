import React, { useContext, useEffect, useState } from 'react'
import "./TimerMain.css"
import { LoadingScreenContext } from '../../../Pages/main/MainPage'

function TimerMain() {
  const loadingContext:any = useContext(LoadingScreenContext)
  const [nowTime,setNowTime] = useState<number>(30)
  const startTime = ()=>{
    const mainLoop = setInterval(()=>{
      if (nowTime > 0){
        setNowTime((now)=>now-1)
      }else{
        clearInterval(mainLoop)
      }
    },1000)
  }
  useEffect(()=>{
    if (!loadingContext.get){
      startTime()
    }
  },[loadingContext.get])
  useEffect(()=>{
    console.log(nowTime)
  },[nowTime])
  return (
    <div className="leftBarBottomIcons">
    <div className="topBarTimer">
        <span className="topBarTimerText">3:00</span>
    </div>
</div>
  )
}

export default TimerMain