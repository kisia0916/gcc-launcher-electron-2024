import React, { useContext, useEffect, useState } from 'react';
import "./MainSpace.css"
import GenreSectionMain from './Contents/GenreSection/GenreSectionMain';
import { GameListContext } from '../../App';

function MainSpace() {
  const GameList = useContext<any>(GameListContext)
  const [genreList,setGenreList] = useState<any>([])
  useEffect(()=>{
    console.log(GameList)
    if (GameList.games){
      console.log("hello")
      Object.entries(GameList.games).forEach(([key,value])=>{
        if (key !== "genres"){
          const genre = key[0].toUpperCase()+key.slice(1)
          setGenreList((genreList:any)=>[...genreList,<GenreSectionMain genreTitle={genre} genreGames={value}/>])
        }
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
