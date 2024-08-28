
import  { useState } from 'react';

import { HiBars3 } from 'react-icons/hi2';
import { NavLink} from 'react-router-dom';


const Sidebar = ({ onTitleChange }) => {
  const [show, setShow] = useState(false);

  const toggleSideBar = () => {
    setShow(!show);
  };

  return (
    <div className="shadow-white">
      <HiBars3 className="text-4xl text-white absolute top-6 left-5" onClick={toggleSideBar} />
      {show && (
        <div className="bg-navbar border-2 shadow-md px-12 py-0 top-0 fixed z-1 h-screen w-64 ">
          <p className="text-xl text-white m-7">Sidebar</p>
          <HiBars3 className="text-4xl text-white absolute top-3 right-6 mt-3 " onClick={toggleSideBar} />
          <div className="flex flex-col gap-2 text-white p-4 text-xl">
            <NavLink to="/" className="p-2" onClick={() => onTitleChange('Home')}>Home</NavLink>
            <NavLink to="/watchlist" className="p-2" onClick={() => onTitleChange('Watch List')}>Watch List</NavLink>
            <NavLink to="/watchedlist" className="p-2" onClick={() => onTitleChange('Watched List')}>Watched List</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
