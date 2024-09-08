import React, { useContext, useEffect, useState } from 'react';
import "./MainSpace.css"
import GenreSectionMain from './Contents/GenreSection/GenreSectionMain';
import { GameListContext } from '../../App';

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
      let gamesList:any[] = []
      Object.entries(GameList.games).forEach(([key,value]:[string,any])=>{
        if (key !== "genres"){
          const targetIndex = gamesList.findIndex((i)=>i === key)
          if (targetIndex !== -1){
            const genre = key[0].toUpperCase()+key.slice(1)
            gamesList[targetIndex] = <GenreSectionMain genreTitle={genre} genreGames={value}/>
            // setGenreList((genreList:any)=>[...genreList,<GenreSectionMain genreTitle={genre} genreGames={value}/>])
          }
        }else{
          value.forEach((i:string)=>{
            gamesList = [...gamesList,i]
          })
        }
      })
      setGenreList(gamesList)
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
