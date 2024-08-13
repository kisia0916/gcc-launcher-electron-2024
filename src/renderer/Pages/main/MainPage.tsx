import React from 'react';
import LeftBarMain from '../../Components/LeftBar/LeftBarMain';
import MainSpace from '../../Components/MainSpace/MainSpace';
import "./MainPage.css"

function MainPage() {
  return (
    <div className='luncherMainSpace'>
      <LeftBarMain />
      <MainSpace/>
    </div>
  );
}

export default MainPage;
