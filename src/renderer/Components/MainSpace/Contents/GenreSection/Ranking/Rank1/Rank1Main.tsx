import React, { useEffect } from 'react'
import MainSpaceButtonMain from '../../../Buttons/MainSpaceButtonMain'
import DifficultMain from '../../../Difficult/DifficultMain'

function Rank1Main(props:{img1:string,icon1:string,title:string,profile:string}) {
  useEffect(()=>{
    // alert(props.img1)
  },[props])
  return (
    <div className="prmoMainGame">
      <img src={props.img1} className="promGameImg" alt=""/>
      <div className="promRankNum rank1">
          <img src={props.icon1} className="promRankIcon" alt=""/>
          <span className="promRankText">人気No.1</span>
      </div>
      <div className="promMainGameTitle">
          <span className="promMainGameTitleText">{props.title}</span>
          <div className="promMainGameProfile">
              <span>{props.profile}</span>
              {/* <span>フォートナイトは、100人が一つの島に降り立って、武器を拾ったり建築したりしながら、最後の一人を目指して戦うバトルロイヤルゲーム。派手なスキンやダンス、友達とチームを組んで遊ぶのも楽しい要素。建築とバトルの駆け引きが熱い人気タイトル！</span> */}
          </div>
          <div className="promMainGameButtonMain">
              <MainSpaceButtonMain/>
              <DifficultMain/>
          </div>
      </div>
    </div>
  )
}

export default Rank1Main