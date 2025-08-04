import React from 'react';
import underConstruction from 'src/assets/images/under-construction.png';
import './ComingSoon.css';


const ComingSoon: React.FC = () => {
  return (
    <div className='full-screen'>
      <img
        src={underConstruction}
        alt="Coming Soon"
        className='under-construction-image'
      />
    </div>
  )
};

export default ComingSoon;