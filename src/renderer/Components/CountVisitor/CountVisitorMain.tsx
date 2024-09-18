import React, { useContext, useEffect, useState } from 'react'
import "./CountVisitorMain.css"
import CountVisitorButtonMain from './CountVisitorButton/CountVisitorButtonMain'
import { CountVisitorContext } from '../../Pages/main/MainPage'

function CountVisitorMain() {
  const [aniFlg,setAniFlg] = useState<boolean>(false)
  const countVisitorProvider:any = useContext(CountVisitorContext)
  useEffect(()=>{
    if (aniFlg){
      setTimeout(()=>{
        countVisitorProvider.set({state:false})
      },1500)
    }
  },[aniFlg])
  return (
    <div className={`CountVisitorMain ${aniFlg?"hidden":""}`}>
        <div className='CountVisitorContents'>
          <div className='CountVisitorContentsCover'>
            <div className='CountVisitorCounterTitle'>
              <span className='CountVisitorTitleText'>人数を選択してください</span>
            </div>
            <div className='CountVisitorSelectButtons'>
              <div className='CountVisitorSelectButtonMain'>
                <CountVisitorButtonMain num={1} color='blue' setFlg={setAniFlg} Flg={aniFlg}/>
                <CountVisitorButtonMain num={2} color='green' setFlg={setAniFlg} Flg={aniFlg}/>
                <CountVisitorButtonMain num={3} color='yellow' setFlg={setAniFlg} Flg={aniFlg}/>
                <CountVisitorButtonMain num={4} color='orange' setFlg={setAniFlg} Flg={aniFlg}/>
                <CountVisitorButtonMain num={5} color='red' setFlg={setAniFlg} Flg={aniFlg}/>
              </div>
            </div>
          </div>
        </div>
    </div>  
  )
}

export default CountVisitorMain