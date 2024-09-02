import React from 'react';
import "./MainSpace.css"
import GenreSectionMain from './Contents/GenreSection/GenreSectionMain';

function MainSpace() {
  return (
    <div className='mainScreen'>
      <div>
        <GenreSectionMain genreTitle="Latest Games"/>
        <GenreSectionMain genreTitle='Action'/>
        <GenreSectionMain genreTitle='Card'/>
      </div>
      <div style={{width:"100%",height:"30px"}}></div>
    </div>
  )
}

export default MainSpace;
