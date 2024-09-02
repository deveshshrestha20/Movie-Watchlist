// Hover.js
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { IoCheckmarkCircleOutline } from 'react-icons/io5'; 
import MovieDetails from './MovieDetails';

const Hover = ({ name, details, date, movieId, mediaType }) => {
  const [isActive, setIsActive] = useState(false);

  // Toggle active state on click
  const handleIconClick = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className="relative w-56 h-72 bg-black opacity-60 z-10">
    {!isActive ? (
      <div className=''>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-addcolor h-12 flex items-center justify-center rounded-lg">
        <button
          className="text-white  ml-2 font-semibold"
          onClick={handleIconClick}
        >
          Add to Watchlist
        </button>
      </div>
      <div className="absolute top-52 left-32 transform -translate-x-2/3 -translate-y-2/3 bg-addcolor h-12 flex items-center justify-center rounded-lg pl-3 pr-2">
        <button
          className="text-white  ml-2  font-semibold"
          onClick={handleIconClick}
        >
          Add to Watchedlist
        </button>
      </div>
      </div>
    ): (
        <IoCheckmarkCircleOutline
          className="absolute top-28 left-16 p-1 h-16 w-20 text-green-500 cursor-pointer"
          onClick={handleIconClick}
          style={{ opacity: 1 }}
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
