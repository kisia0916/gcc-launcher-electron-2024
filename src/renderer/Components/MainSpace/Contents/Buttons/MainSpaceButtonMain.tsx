import React, { useState } from 'react'
import "./MainSpaceButtonMain.css"
import icon2 from "../../../../../../assets/img/play_fill (1).svg"
import icon3 from "../../../../../../assets/img/run_line.svg"

function MainSpaceButtonMain(props:{game_path:string}) {
  const [buttonText,setButtonText] = useState<string>("Play")
  const [isRunning,setIsRunning] = useState<boolean>(false)
  const sendRunSig = (path:string)=>{
    setButtonText("Running...")
    setIsRunning(true)
    window.electron.ipcRenderer.sendMessage("run_game",{game_path:path})
    window.electron.ipcRenderer.on("close-game-process",()=>{
      setIsRunning(false)
      setButtonText("Play")
    })
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