import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io'; 
import { IoCheckmarkCircleOutline } from 'react-icons/io5'; 
import MovieDetails from './MovieDetails';

const Hover = ({ name, details, date }) => {


  const [isActive, setIsActive] = useState(false);



  // Toggle active state on click
  const handleIconClick = () => {
    setIsActive(prev => !prev); // Toggle state between true and false
  };

  return (
    <div className='w-56 h-72 bg-black opacity-60 relative'>
      {/* Render different icons based on the isActive state */}
      {!isActive ? (
        <IoIosAddCircleOutline
          className='absolute top-28 left-10 p-1 h-16 w-20 text-white cursor-pointer'
          onClick={handleIconClick} // Toggle active state on click
        />
      ) : (
        <IoCheckmarkCircleOutline
          className='absolute top-28 left-10 p-1 h-16 w-20 text-green-500 cursor-pointer'
          onClick={handleIconClick} // Toggle back to inactive on click
        />
      )}

      <MovieDetails name={name} details={details} date={date} />
    </div>
  );
};

export default Hover;
