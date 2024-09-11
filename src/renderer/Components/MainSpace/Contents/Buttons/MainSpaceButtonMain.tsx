import React, { useDebugValue, useEffect, useState } from 'react'
import "./MainSpaceButtonMain.css"
import icon2 from "../../../../../../assets/img/play_fill (1).svg"
import icon3 from "../../../../../../assets/img/run_line.svg"
const { v4: uuidv4 } = require('uuid')


function MainSpaceButtonMain(props:{game_path:string,title:string}) {
  const [buttonText,setButtonText] = useState<string>("Play")
  const [isRunning,setIsRunning] = useState<boolean>(false)
  const [processId,setProcessId] = useState<string>("")
  useEffect(()=>{
    setProcessId(uuidv4())
  },[])
  const sendRunSig = (path:string)=>{
    if (!isRunning){
      setButtonText("Running...")
      setIsRunning(true)
      window.electron.ipcRenderer.sendMessage("add-view-counter-request",{title:props.title})      
      window.electron.ipcRenderer.sendMessage("run_game",{game_path:path,processId:processId})
      window.electron.ipcRenderer.on("close-game-process",(arg:any)=>{
        console.log(arg)
        if (processId === arg.processId){
          setIsRunning(false)
          setButtonText("Play")
        }
      })
    }
  }
  return (
    <div className="promMainGameButton" onClick={()=>sendRunSig(props.game_path)}>
        <div className="promMainGameButtonMain">
            <img src={isRunning?icon3:icon2} alt="" className="promMainGameButtonIcon"/>
            <span className="promMainGameButtonText">{buttonText}</span>
        </div>
    </div>
  )
}

export default MainSpaceButtonMain