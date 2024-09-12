import React from 'react'
import "./LauncherViewCloseButtonMain.css"
import icon from "../../../../../assets/img/close_line.svg"


function LauncherViewCloseButtonMain(props:{project_type:string}) {
  const closeViewer = ()=>{
    window.electron.ipcRenderer.sendMessage("close-game-process",{project_type:props.project_type})
  }
  return (
    <div className='LauncherViewCloseButtonMain' onClick={closeViewer}>
          <img src={icon} className='LauncherViewCloseButtonIcon' alt=''/>
    </div>
  )
}

export default LauncherViewCloseButtonMain