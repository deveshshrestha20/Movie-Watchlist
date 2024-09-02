// Hover.js
import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io'; 
import { IoCheckmarkCircleOutline } from 'react-icons/io5'; 
import MovieDetails from './MovieDetails';

const Hover = ({ name, details, date, movieId, mediaType }) => {
  const [isActive, setIsActive] = useState(false);

  // Toggle active state on click
  const handleIconClick = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className="relative w-56 h-72 bg-black opacity-60">
      {!isActive ? (
        <IoIosAddCircleOutline
          className="absolute top-28 left-10 p-1 h-16 w-20 text-white cursor-pointer"
          onClick={handleIconClick}
        />
      ) : (
        <IoCheckmarkCircleOutline
          className="absolute top-28 left-10 p-1 h-16 w-20 text-green-500 cursor-pointer"
          onClick={handleIconClick}
        />
      )}

      {/* Pass mediaType to MovieDetails */}
      <MovieDetails 
        name={name} 
        details={details} 
        date={date} 
        movieId={movieId} 
        mediaType={mediaType} 
      />
    </div>
  );
};

export default Hover;
