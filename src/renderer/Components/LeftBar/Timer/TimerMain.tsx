import React, { useContext, useEffect, useState } from 'react'
import "./TimerMain.css"
import { CountVisitorContext, LoadingScreenContext } from '../../../Pages/main/MainPage'
import { Navigate } from 'react-router-dom'

function TimerMain() {
  const loadingContext:any = useContext(LoadingScreenContext)
  const countVisitorProvider:any = useContext(CountVisitorContext)
  const [nowTime,setNowTime] = useState<number|-1>(-1)
  const [timerStartFlg,setTimerStartFlg] = useState<boolean>(false)
  const [timerNums,setTimerNums] = useState<any>([0,0])
  const [isEnd,setIsEnd] = useState<boolean>(false)
  const startTimer = ()=>{
    const mainLoop = setInterval(()=>{
      if (nowTime !== -1){
        if (nowTime > 0){
          setNowTime((now)=>{
            if (now > 0){
              return now-1
            }else{
              clearInterval(mainLoop)
              return now
            }
          })
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
    console.log(loadingContext.get)
    console.log(countVisitorProvider.get)
    if (!loadingContext.get && nowTime !== -1 && !timerStartFlg && !countVisitorProvider.get){
      console.log("testestestest")
      setTimerStartFlg(true)
      startTimer()
    }
    setTimerNums(()=>{
      const frist = Math.floor(nowTime/60)
      let rast:string = Math.floor(nowTime%60).toString()
      if (rast.length < 2){
        rast = "0"+rast
      }
      return [frist,rast]
    })
    if (nowTime <= 0 && nowTime !== -1){
      setIsEnd(true)
    }
  },[loadingContext.get,nowTime,countVisitorProvider.get])

  return (
    <div className="leftBarBottomIcons">
    <div className="topBarTimer">
        <span className="topBarTimerText">{timerNums[0]}:{timerNums[1]}</span>
    </div>
    {isEnd?<Navigate to="/end"/>:<></>}
</div>
  )
}

export default TimerMain