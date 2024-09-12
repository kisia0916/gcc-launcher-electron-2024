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

export const HopUpContext:any = createContext("")
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

  const [hopUpWindowFlg,setHopUpWindowFlg] = useState<{status:boolean,title:string,img:string,profile:string,place:string,view:number}>({status:false,title:"",img:"",profile:"",place:"",view:0})

  return (
      <HopUpContext.Provider value={setHopUpWindowFlg}>
          <ScratchRunnerMain page_path=''/>
          {hopUpWindowFlg.status?<HopUpWindowMain title={hopUpWindowFlg.title} img={hopUpWindowFlg.img} profile={hopUpWindowFlg.profile} place={hopUpWindowFlg.place} view={hopUpWindowFlg.view}/>:<></>}
          <div className='mainSpace'>
            <div className='luncherMainSpace'>
              <LeftBarMain />
              <MainSpace/>
            </div>
          </div>
      </HopUpContext.Provider>
  );
}

export default MainPage;
