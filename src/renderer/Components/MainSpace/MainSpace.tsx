import React, { useContext, useEffect, useState } from 'react';
import "./MainSpace.css"
import GenreSectionMain from './Contents/GenreSection/GenreSectionMain';
import { GameListContext } from '../../App';
import ScratchRunnerMain from '../LauncherViewer/Scratch/ScratchRunnerMain';

const sortGame = (list:any,target:any)=>{
  let returnData = target.map((i:any)=>{
    return ""
  })
  Object.entries(list).forEach(([key,value]:[string,any],index:number)=>{
    if (key !== "genres"){
      const targetIndex = target.findIndex((i:string)=>i === key)
      if (targetIndex !== -1){
        returnData[targetIndex] = value
      }
    }
  })
  return returnData
}

function MainSpace() {
  const GameList = useContext<any>(GameListContext)
  const [genreList,setGenreList] = useState<any>([])
  useEffect(()=>{
    window.electron.ipcRenderer.on("select-genre",(arg:any)=>{
      const scrollTarget = document.querySelector(`.${arg.genre}`)
      scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  },[])
  useEffect(()=>{
    if (GameList.games){
      const genreContentList:string[] = GameList.games.genres
      let gamesList:any[] = []
      window.electron.ipcRenderer.sendMessage("send-init-request",{genres:genreContentList})
      window.electron.ipcRenderer.on("send-init-response",async(arg:any)=>{
        const mainTargetList = sortGame(GameList.games,genreContentList)
        console.log(mainTargetList)
        gamesList = genreContentList.map((i:any)=>{
            return ""
        })
        mainTargetList.forEach((i:any,index:number)=>{
            const genre = genreContentList[index][0].toUpperCase()+genreContentList[index].slice(1)
            const rankingGames = arg.ranking.data[index].map((k:any)=>{
              let returnData = i.find((m:any)=>m.title === k.title)
              returnData.view = k.counter
              return returnData
            })
            let returnGames = arg.view.data[index].map((k:any)=>{
              let returnData = i.find((m:any)=>m.title === k.title)
              console.log(returnData)
              if (returnData){
                returnData.view = k.counter
              }else{
                return null
              }
              return returnData
            }).filter((content:any)=>content !== null)
            returnGames.sort((a:any,b:any)=>b.view-a.view)
            gamesList[index] = <GenreSectionMain genreTitle={genre} genreGames={returnGames} ranking={rankingGames}/>
        })
        setGenreList(gamesList)
      })
    }
  },[GameList.games])
  return (
    <div className='mainScreen'>
      <div>
        {genreList.map((i:any)=>{
          return i
        })}
      </div>
      <div style={{width:"100%",height:"30px"}}></div>
    </div>
  )
}

export default MainSpace;
