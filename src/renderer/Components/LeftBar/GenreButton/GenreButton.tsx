import React, { useEffect, useState } from 'react'
import "./GenreButton.css"

function GenreButton(props:{icon:string,title:string,selected:boolean}) {
  const [isSelect,setIsSelect] = useState<boolean>(props.selected)
  const push_function = ()=>{
    window.electron.ipcRenderer.sendMessage("select-genre",{genre:props.title})
    setIsSelect(true)
  }
  useEffect(()=>{
    window.electron.ipcRenderer.on("select-genre",(arg:any)=>{
      if (arg.genre !== props.title){
        setIsSelect(false)
      }
    })
  },[])
  return (
    <div className={`gameIcon ${isSelect?"selected":""}`} onClick={push_function}>
    <div className="gameIconMain">
        <img src={props.icon} alt="" className="gameIconImg"/>
        <div className="leftTitle">
            <span className="leftTitleText">{props.title}</span>
        </div>
    </div>
</div>
  )
}

export default GenreButton