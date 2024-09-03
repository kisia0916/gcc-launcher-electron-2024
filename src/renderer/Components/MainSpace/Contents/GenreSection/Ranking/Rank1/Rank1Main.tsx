import React from 'react'

function Rank1Main() {
  return (
    <div className="prmoMainGame">
      <img src={img1} className="promGameImg" alt=""/>
      <div className="promRankNum rank1">
          <img src={icon1} className="promRankIcon" alt=""/>
          <span className="promRankText">人気No.1</span>
      </div>
      <div className="promMainGameTitle">
          <span className="promMainGameTitleText">Fortnite</span>
          <div className="promMainGameProfile">
              <span>フォートナイトは、100人が一つの島に降り立って、武器を拾ったり建築したりしながら、最後の一人を目指して戦うバトルロイヤルゲーム。派手なスキンやダンス、友達とチームを組んで遊ぶのも楽しい要素。建築とバトルの駆け引きが熱い人気タイトル！</span>
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