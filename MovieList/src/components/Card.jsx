// Card.js
import { useState } from 'react';
import Hover from './Hover';

const Card = ({ title, image, date, name, details, rating, movieId, mediaType }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="w-56 h-72 m-3 rounded-lg shadow-md bg-gray-800 hover:shadow-xl transform hover:scale-125 transition-transform duration-300"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {isActive && (
        <div className="absolute inset-0 z-10">
          <Hover 
            name={name} 
            details={details} 
            date={date} 
            movieId={movieId} 
            mediaType={mediaType} // Pass mediaType to Hover
          />
        </div>
      )}
      <div className="h-72 overflow-hidden rounded-t-lg">
        <img className="w-full h-full object-cover" src={image} alt={title} />
        <b className="text-white h-6 w-36 mt-3 ml-7 font-semibold text-sm truncate absolute bottom-0">
          {title}
        </b>
        <div className="absolute top-0 rounded-full mt-2 ml-2 h-7 w-8 bg-orange-400">
          <b className="text-center p-1">{rating}</b>
        </div>
      </div>
    </div>
  );
};

export default Card;
