import React from 'react';
import { MdLiveTv } from 'react-icons/md';

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* Center the icon and text horizontally and vertically */}
      <div className="flex items-center space-x-4">
        <MdLiveTv className="text-9xl text-white" />
        <p className="text-2xl text-white">Your watchlist is empty.</p>
      </div>
    </div>
  );
};

export default EmptyPage;
