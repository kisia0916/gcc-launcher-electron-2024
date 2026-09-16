import React, { useContext, useEffect, useState } from 'react'
import "./MainSpaceButtonMain.css"
import icon2 from "../../../../../../assets/img/play_fill (1).svg"
import icon3 from "../../../../../../assets/img/run_line.svg"
import { MovieViewerContext, ScratchRunnerContext } from '../../../../Pages/main/MainPage'
const { v4: uuidv4 } = require('uuid')


function MainSpaceButtonMain(props:{game_path:string,title:string,project_type:string}) {
  const scratchRunner:any = useContext(ScratchRunnerContext)
  const movieViewer:any = useContext(MovieViewerContext)
  const [buttonText,setButtonText] = useState<string>("Play")
  const [isRunning,setIsRunning] = useState<boolean>(false)
  const [processId] = useState<string>(()=>uuidv4())
  useEffect(()=>{
    return window.electron.ipcRenderer.on("close-game-process",(arg:any)=>{
      if (arg.project_type === "exe" && processId === arg.processId){
        setIsRunning(false)
        setButtonText("Play")
      }else if (arg.project_type === "scratch" || arg.project_type === "movie"){
        setIsRunning(false)
        setButtonText("Play")
      }
    })
  },[processId])
  const sendRunSig = (path:string,project_type:string)=>{
    if (!isRunning){
      console.log(project_type)
      setButtonText("Running...")
      setIsRunning(true)
      window.electron.ipcRenderer.sendMessage("add-view-counter-request",{title:props.title})
      if (project_type === "exe"){
        window.electron.ipcRenderer.sendMessage("run_game",{game_path:path,processId:processId,title:props.title})
      }else if (project_type === "scratch"){
        scratchRunner({state:true,path:props.game_path})
      }else if (project_type === "movie"){
        movieViewer({state:true,path:props.game_path})
      }
    }
  }
  return (
    <div className="promMainGameButton" onClick={()=>sendRunSig(props.game_path,props.project_type)}>
        <div className="promMainGameButtonMain">
            <img src={isRunning?icon3:icon2} alt="" className="promMainGameButtonIcon"/>
            <span className="promMainGameButtonText">{buttonText}</span>
        </div>
    </div>
  )
}

export default MainSpaceButtonMain
