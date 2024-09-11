import React, { useContext, useEffect, useState } from 'react';
import "./MainSpace.css"
import GenreSectionMain from './Contents/GenreSection/GenreSectionMain';
import { GameListContext } from '../../App';

const sortGame = (list:any,target:any)=>{
  let returnData = target.map((i:any)=>{
    return ""
  })
  Object.entries(list).forEach(([key,value]:[string,any],index:number)=>{
    if (index>0){
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
  const genreContentList:string[] = ["action","command","shooting","table","other"]
  useEffect(()=>{
    window.electron.ipcRenderer.on("select-genre",(arg:any)=>{
      const scrollTarget = document.querySelector(`.${arg.genre}`)
      scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  },[])
  useEffect(()=>{
    if (GameList.games){
      let gamesList:any[] = []
      window.electron.ipcRenderer.sendMessage("get-genre-ranking-request",{genres:["action","command","shooting","table","other"]})
      window.electron.ipcRenderer.on("get-genre-ranking-response",async(arg:any)=>{
        console.log(arg.data.data)
        const mainTargetList = sortGame(GameList.games,["action","command","shooting","table","other"])
        console.log(mainTargetList)
        gamesList = genreContentList.map((i:any)=>{
            return ""
        })
        mainTargetList.forEach((i:any,index:number)=>{
            const genre = genreContentList[index][0].toUpperCase()+genreContentList[index].slice(1)
            const rankingGames = arg.data.data[index].map((k:any)=>{
              console.log(k)
              return i.find((m:any)=>m.title === k.title)
            })
            console.log(rankingGames)
            gamesList[index] = <GenreSectionMain genreTitle={genre} genreGames={i} ranking={rankingGames}/>
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
