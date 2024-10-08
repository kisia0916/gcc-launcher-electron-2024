import React, { useEffect } from 'react'
import MainSpaceButtonMain from '../../../Buttons/MainSpaceButtonMain'
import DifficultMain from '../../../Difficult/DifficultMain'
import ViewCounterMain from '../../../ViewCounter/ViewCounterMain'

function Rank1Main(props:{img1:string,icon1:string,title:string,profile:string,place:string,view:number,project_type:string,diff:"easy"|"normal"|"hard"}) {
  useEffect(()=>{
    // alert(props.img1)
  },[props])
  return (
    <div className="prmoMainGame">
      <img src={props.img1} className="promGameImg" alt=""/>
      <div className='promRankTop'>
        <div className="promRankNum rank1">
            <img src={props.icon1} className="promRankIcon" alt=""/>
            <span className="promRankText">人気No.1</span>
        </div>
      </div>
      <div className="promMainGameTitle">
          <div className='promMainGameTitleSpace'>
            <div className='promMainDiffIconPlace'>
              <DifficultMain diff={props.diff} size={1}/>
            </div>
            <span className="promMainGameTitleText">{props.title}</span>
          </div>
          <div className="promMainGameProfile">
              <span>{props.profile}</span>
          </div>
          <div className="promMainGameButtonMain">
              <MainSpaceButtonMain game_path={props.place} title={props.title} project_type={props.project_type}/>
              <ViewCounterMain view={props.view} size={1}/>
              {/* <DifficultMain/> */}
          </div>
      </div>
    </div>
  )
}

export default Rank1Main