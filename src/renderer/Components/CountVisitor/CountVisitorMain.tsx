import React from 'react'
import "./CountVisitorMain.css"

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
                  <button className='CountVisitorSelectButton blue'>1</button>
                  <button className='CountVisitorSelectButton green'>2</button>
                  <button className='CountVisitorSelectButton yellow'>3</button>
                  <button className='CountVisitorSelectButton orange'>4</button>
                  <button className='CountVisitorSelectButton red'>5</button>
              </div>
            </div>
          </div>
        </div>
    </div>  
  )
}

export default CountVisitorMain