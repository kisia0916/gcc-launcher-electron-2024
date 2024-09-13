import React from 'react'
import "./MovieViewerMain.css"
import LauncherViewCloseButtonMain from '../LauncherViewerCloseButton/LauncherViewCloseButtonMain'

function MovieViewerMain(props:{page_path:string}) {
  return (
    <div className='MovieViewerMain'>
        <LauncherViewCloseButtonMain project_type='movie'/>
        <video controls autoPlay src={props.page_path} className='MovieViewerVideo'></video>
    </div>
  )
}

export default MovieViewerMain