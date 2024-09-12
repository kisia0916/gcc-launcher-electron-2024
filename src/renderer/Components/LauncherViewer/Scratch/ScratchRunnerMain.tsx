import React, { useContext, useRef } from 'react'
import "./ScratchRunnerMain.css"
import LauncherViewCloseButtonMain from '../LauncherViewerCloseButton/LauncherViewCloseButtonMain'
import { ScratchRunnerContext } from '../../../Pages/main/MainPage'

function ScratchRunnerMain(props:{page_path:string}) {
  const scratchRunner:any = useContext(ScratchRunnerContext)
  const pushClose = ()=>{
    scratchRunner({state:false,path:""})
  }
  return (
    <div className="scratchRunnerMain" onClick={pushClose}>
        <LauncherViewCloseButtonMain project_type='scratch'/>
        <iframe src={props.page_path} className='scratchRunnerFrame'>

        </iframe>
    </div>
  )
}

export default ScratchRunnerMain