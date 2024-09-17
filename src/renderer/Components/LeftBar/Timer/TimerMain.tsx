import React, { useContext, useEffect, useState } from 'react'
import "./TimerMain.css"
import { LoadingScreenContext } from '../../../Pages/main/MainPage'

function TimerMain() {
  const loadingContext:any = useContext(LoadingScreenContext)
  const [nowTime,setNowTime] = useState<number|-1>(-1)
  const [timerStartFlg,setTimerStartFlg] = useState<boolean>(false)
  const [timerNums,setTimerNums] = useState<any>([0,0])
  const startTime = ()=>{
    const mainLoop = setInterval(()=>{
      if (nowTime !== -1){
        if (nowTime > 0){
          setNowTime((now)=>{return now-1})
        }else{
          clearInterval(mainLoop)
        }
      }
    },1000)
  }
  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage("get-timer-info","")
    window.electron.ipcRenderer.on("get-timer-info",(arg:any)=>{
      setNowTime(arg as number)
    })
  },[])
  useEffect(()=>{
    if (!loadingContext.get && nowTime !== -1 && !timerStartFlg){
      setTimerStartFlg(true)
      startTime()
    }
    setTimerNums(()=>{
      const frist = Math.floor(nowTime/60)
      let rast:string = Math.floor(nowTime%60).toString()
      if (rast.length < 2){
        rast = "0"+rast
      }
      return [frist,rast]
    })
    if (nowTime < 0){
      alert("end")
    }
  },[loadingContext.get,nowTime])
  return (
    <div className="leftBarBottomIcons">
    <div className="topBarTimer">
        <span className="topBarTimerText">{timerNums[0]}:{timerNums[1]}</span>
    </div>
</div>
  )
}

export default TimerMain