import React, { useEffect, useState } from 'react'
import "./DifficultMain.css"
import icon1 from "../../../../../../assets/img/XRP_line (1).svg"
import icon2 from "../../../../../../assets/img/XRP_line.svg"
import icon3 from "../../../../../../assets/img/XRP_line_red.svg"


function DifficultMain(props:{diff:number}) {
  const [icon,setIcon] = useState<any>()
  useEffect(()=>{
    if (props.diff === 1){
      setIcon(icon1)
    }else if (props.diff === 2){
      setIcon(icon2)
    }else if (props.diff === 3){
      setIcon(icon3)
    }
  },[])

  return (
    <div className="promMainGameDiff">
      <img src={icon} className="promMainGameDiffIcon" alt=""/>
      {/* <span className="promMainGameDiffText">Easy</span> */}
    </div>
  )
}

export default DifficultMain