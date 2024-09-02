import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/main/MainPage';
import { useEffect } from 'react';

export default function App() {
  useEffect(()=>{
    console.log("send")
    window.electron.ipcRenderer.sendMessage("load-games-data","")
    window.electron.ipcRenderer.on("load-games-data",(arg:any)=>{
      console.log(arg)
    })

  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
