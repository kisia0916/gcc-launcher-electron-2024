import React from 'react'
import "./CountVisitorMain.css"
import CountVisitorButtonMain from './CountVisitorButton/CountVisitorButtonMain'

function CountVisitorMain() {
  return (
    <div className='CountVisitorMain'>
        <div className='CountVisitorContents'>
          <div className='CountVisitorContentsCover'>
            <div className='CountVisitorCounterTitle'>
              <span className='CountVisitorTitleText'>人数を選択してください</span>
            </div>
            <div className='CountVisitorSelectButtons'>
              <div className='CountVisitorSelectButtonMain'>
                <CountVisitorButtonMain/>
                <CountVisitorButtonMain/>
                <CountVisitorButtonMain/>
                <CountVisitorButtonMain/>
                <CountVisitorButtonMain/>
              </div>
            </div>
          </div>
        </div>
    </div>  
  )
}

export default CountVisitorMain