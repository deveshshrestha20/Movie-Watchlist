
import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useState } from 'react';
import ApiFetch from './components/apiFetch';
function App() {

  const [headerTitle, setHeaderTitle] = useState("Home");
  const location = useLocation();

  const handleTitleChange = (newTitle) => {
    setHeaderTitle(newTitle);
  }
  

  return (
    <div className='bg-maincolor min-h-screen'>
      <Header title={headerTitle}/>
      <Sidebar onTitleChange={handleTitleChange}/>
      {location.pathname === "/"  && <ApiFetch/> }
      {/* <ApiFetch/> */}
      <Outlet/>
      
      
      
    </div>
  )
}

export default App
