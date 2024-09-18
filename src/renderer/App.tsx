import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/main/MainPage';
import { createContext, useEffect, useState } from 'react';
import EndPageMain from './Pages/endPage/EndPageMain';

export const GameListContext = createContext<{games:any,loadFlg:boolean}|string>("")
export default function App() {
  const [games,setGames] = useState("")
  const [DoneFirstLoad,setDoneFirstLoad] = useState<boolean>(false)
  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage("load-games-data","")
    window.electron.ipcRenderer.on("load-games-data",(arg:any)=>{
      console.log(arg)
      setGames(arg)
      setDoneFirstLoad(true)
    })
  },[])
  return (
      <GameListContext.Provider value={{
        games:games,
        loadFlg:DoneFirstLoad
      }}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/end" element={<EndPageMain/>} />
          </Routes>
        </Router>
      </GameListContext.Provider>
  );
}
