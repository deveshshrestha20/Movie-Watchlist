// WatchList.js
import React from 'react';
import EmptyPage from './EmptyPage';

const WatchList = ({ watchList=[] }) => {
  if (watchList.length === 0) {
    return <EmptyPage/>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
      {watchList.map((item) => (
        <div key={item.id} className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
            <h3 className="text-sm font-semibold">{item.title || item.name}</h3>
            <p className="text-xs">{item.release_date || item.first_air_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchList;
