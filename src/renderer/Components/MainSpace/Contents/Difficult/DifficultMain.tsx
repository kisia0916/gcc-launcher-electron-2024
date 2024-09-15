import React, { useEffect, useState } from 'react'
import "./DifficultMain.css"
import icon1 from "../../../../../../assets/img/XRP_line (1).svg"
import icon2 from "../../../../../../assets/img/XRP_line_yellow.svg"
import icon3 from "../../../../../../assets/img/XRP_line_red.svg"


function DifficultMain(props:{diff:"easy"|"normal"|"hard",size:1|2}) {
  const [icon,setIcon] = useState<any>()
  const [iconSize,setIconSize] = useState<1|2>(props.size)
  useEffect(()=>{
    if (props.diff === "easy"){
      setIcon(icon1)
    }else if (props.diff === "normal"){
      setIcon(icon2)
    }else if (props.diff === "hard"){
      setIcon(icon3)
    }
  },[])

  return (
    <div className="promMainGameDiff">
      <img src={icon} className={iconSize === 1?"promMainGameDiffIcon":"promMainGameDiffIconMini"} alt=""/>
    </div>
  )
}

export default DifficultMain