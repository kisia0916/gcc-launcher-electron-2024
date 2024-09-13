import React, { useContext } from 'react'
import "./MovieViewerMain.css"
import LauncherViewCloseButtonMain from '../LauncherViewerCloseButton/LauncherViewCloseButtonMain'
import { MovieViewerContext } from '../../../Pages/main/MainPage'

function MovieViewerMain(props:{page_path:string}) {
  const movieViewer:any = useContext(MovieViewerContext)
  const pushClose = ()=>{
    movieViewer({state:false,path:""})
  }
  return (
    <div className='MovieViewerMain' onClick={pushClose}>
        <LauncherViewCloseButtonMain project_type='movie'/>
        <video controls autoPlay src={props.page_path} className='MovieViewerVideo'></video>
    </div>
  )
}

export default MovieViewerMain