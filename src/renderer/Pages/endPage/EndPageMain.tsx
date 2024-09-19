import React from 'react'
import "./EndPageMain.css"
import qr from "../../../../assets/img/site_qr.png"

function EndPageMain() {
  return (
    <div className={`EndPageMain`}>
        <div className='EndPageContents'>
          <div className='EndPageContentsCover'>
            <div className='EndPageCounterTitle'>
              <span className='EndPageTitleText'>体験時間が終了しました</span>
            </div>
            <div className='EndPageSelectButtons'>
              <div className='EndPageSelectButtonMain'>
                <img src={qr} className='EndPageSiteQr'/>
              </div>
            </div>
            <div className='EndPageCounterTitle'>
              <span className='EndPageTitleText'>公式サイトからゲームをダウンロードできます</span>
            </div>
          </div>
        </div>
    </div>  
  )
}

export default EndPageMain