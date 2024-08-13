import React from 'react'
import "./GenreButton.css"

function GenreButton(props:{icon:string,title:string,selected:boolean}) {
  return (
    <div className="gameIcon">
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