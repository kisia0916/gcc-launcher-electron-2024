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
    </div>
  )
}

export default MainSpace;
