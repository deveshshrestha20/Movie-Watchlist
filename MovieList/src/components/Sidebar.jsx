import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onTitleChange }) => {
  const [show, setShow] = useState(false);

  const toggleSideBar = () => {
    setShow(!show);
  };

  return (
    <div className="">
      <HiBars3
        className="text-4xl text-white absolute top-6 left-5 cursor-pointer  z-60"
        onClick={toggleSideBar}
        aria-expanded={show}
        aria-controls="sidebar"
      />
      {show && (
        <div className="bg-navbar border-2 border-none shadow-xl px-12 py-0 top-0 fixed  h-screen w-64 z-70 ">
          <HiBars3
            className="text-4xl text-white absolute top-7 right-6 cursor-pointer "
            onClick={toggleSideBar}
            aria-expanded={show}
            aria-controls="sidebar"
          />
          <div className="flex flex-col gap-2 text-white p-2 text-xl absolute top-14 ">
            <NavLink
              to="/"
              className="p-2"
              onClick={() => {
                onTitleChange('Home');
                setShow(false);
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/watchlist"
              className="p-2"
              onClick={() => {
                onTitleChange('Watch List');
                setShow(false);
              }}
            >
              Watch List
            </NavLink>
            <NavLink
              to="/watchedlist"
              className="p-2"
              onClick={() => {
                onTitleChange('Watched List');
                setShow(false);
              }}
            >
              Watched List
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
