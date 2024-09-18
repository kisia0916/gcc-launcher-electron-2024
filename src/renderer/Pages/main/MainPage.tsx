import React, { createContext, JSXElementConstructor, useEffect, useRef, useState } from 'react';
import LeftBarMain from '../../Components/LeftBar/LeftBarMain';
import MainSpace from '../../Components/MainSpace/MainSpace';
import "./MainPage.css"
import icon from "../../../../assets/img/0b3ec145cce25a1a.png"
import icon2 from "../../../../assets/img/fullscreen_exit_line.svg"
import icon3 from "../../../../assets/img/close_line.svg"
import icon4 from "../../../../assets/img/hexagon_line.svg"
import HopUpWindowMain from '../../Components/HopUpWindow/HopUpWindowMain';
import ScratchRunnerMain from '../../Components/LauncherViewer/Scratch/ScratchRunnerMain';
import MovieViewerMain from '../../Components/LauncherViewer/Movie/MovieViewerMain';
import LoadingScreenMain from '../../Components/LoadingScreen/LoadingScreenMain';
import CountVisitorMain from '../../Components/CountVisitor/CountVisitorMain';

export const HopUpContext:any = createContext("")
export const ScratchRunnerContext:any = createContext("")
export const MovieViewerContext:any = createContext("")
export const LoadingScreenContext:any = createContext("")
export const CountVisitorContext:any = createContext("")
function MainPage() {
  const naviFunctions = {
    close:()=>{
      window.electron.ipcRenderer.sendMessage("close-app","")
    },
    max:()=>{
      window.electron.ipcRenderer.sendMessage("max-app","")
    },
    min:()=>{
      window.electron.ipcRenderer.sendMessage("min-app","")
    }
  }

  const [loadingScreenFlg,setLoadingScreenFlg] = useState<boolean>(true)
  const [hopUpWindowFlg,setHopUpWindowFlg] = useState<{status:boolean,title:string,img:string,profile:string,place:string,view:number,project_type:string,diff:"easy"|"normal"|"hard"}>({status:false,title:"",img:"",profile:"",place:"",view:0,project_type:"",diff:"easy"})
  const [scratchRunnerFlg,setScratchRunnerFlg] = useState<{state:boolean,path:string}>({state:false,path:""})
  const [movieViewerFlg,setMovieViewerFlg] = useState<{state:boolean,path:string}>({state:false,path:""})
  const [CountVisitorFlg,setCountVisitorFlg] = useState<{state:boolean}>({state:false})
  return (
      <LoadingScreenContext.Provider value={{set:setLoadingScreenFlg,get:loadingScreenFlg}}>
      <ScratchRunnerContext.Provider value={setScratchRunnerFlg}>
      <HopUpContext.Provider value={setHopUpWindowFlg}>
      <MovieViewerContext.Provider value={setMovieViewerFlg}>
      <CountVisitorContext.Provider value={setCountVisitorFlg}>
          {CountVisitorFlg.state?<CountVisitorMain/>:<></>}
          {loadingScreenFlg?<LoadingScreenMain/>:<></>}
          {scratchRunnerFlg.state?<ScratchRunnerMain page_path={scratchRunnerFlg.path}/>:<></>}
          {movieViewerFlg.state?<MovieViewerMain page_path={movieViewerFlg.path}/>:<></>}
          {hopUpWindowFlg.status?<HopUpWindowMain title={hopUpWindowFlg.title} img={hopUpWindowFlg.img} profile={hopUpWindowFlg.profile} place={hopUpWindowFlg.place} view={hopUpWindowFlg.view} project_type={hopUpWindowFlg.project_type} diff={hopUpWindowFlg.diff}/>:<></>}
          <div className='mainSpace'>
            <div className='luncherMainSpace'>
              <LeftBarMain />
              <MainSpace/>
            </div>
          </div>
      </CountVisitorContext.Provider>
      </MovieViewerContext.Provider>
      </HopUpContext.Provider>
      </ScratchRunnerContext.Provider>
      </LoadingScreenContext.Provider>
  );
}

export default MainPage;
