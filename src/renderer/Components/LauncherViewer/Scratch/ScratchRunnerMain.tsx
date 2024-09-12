import React from 'react'
import "./ScratchRunnerMain.css"
import LauncherViewCloseButtonMain from '../LauncherViewerCloseButton/LauncherViewCloseButtonMain'

function ScratchRunnerMain(props:{page_path:string}) {
  return (
    <div className="scratchRunnerMain">
        <LauncherViewCloseButtonMain/>
        <iframe src={"C:/gcc/launcher/gcc-launcher-electron-2024/棒人間ラン (1).html"} className='scratchRunnerFrame'>

        </iframe>
    </div>
  )
}

export default ScratchRunnerMain