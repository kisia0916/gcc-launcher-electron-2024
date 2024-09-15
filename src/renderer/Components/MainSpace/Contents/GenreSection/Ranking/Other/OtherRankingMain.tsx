import React, { useContext } from 'react'
import MainSpaceButtonMain from '../../../Buttons/MainSpaceButtonMain'
import DifficultMain from '../../../Difficult/DifficultMain'
import { HopUpContext } from '../../../../../../Pages/main/MainPage'
import ViewCounterMain from '../../../ViewCounter/ViewCounterMain'

function OtherRankingMain(props:{img1:string,icon1:string,icon2:string,title:string,profile:string,rank:2|3,place:string,view:number,project_type:string,diff:"easy"|"normal"|"hard"}) {
  const setHopUpWindow:any = useContext(HopUpContext)
  return (
    <div className="prmoRankingContents" onClick={()=>setHopUpWindow({status:true,title:props.title,img:props.img1,profile:props.profile,place:props.place,view:props.view,project_type:props.project_type,diff:props.diff})}>
        <div className="prmoRankingContent">
        <img src={props.img1} alt="" className="prmoRankingContentImg"/>
        <div className="prmoRankingContentTop">
            <div className="promRankingContentRightNumber rank2">
                <img src={props.icon1} className="promRankingContentRightNumberIcon" alt=""/>
                <span className="promRankingContentRightNumberText">人気No.{props.rank}</span>
            </div>
            <div className="promRankingContentRightNumberDiff diffNormal">
                {/* <img src={props.icon2} className="promRankingContentRightNumberDiffIcon" alt=""/> */}
                {/* <span>Easy</span> */}
                <ViewCounterMain view={props.view} size={2}/>
            </div>
          </div>
          <div className='promRankingContentGameTitle'>
            <div className='promRankingContentGameDiffIcon'>
              <DifficultMain diff={props.diff} size={2}/>
            </div>
            <span className="promRankingContentGameTitleText">{props.title}</span>
          </div>
        </div>
    </div>
  )
}

export default OtherRankingMain