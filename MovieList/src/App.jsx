
import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useState } from 'react';
function App() {

  const [headerTitle, setHeaderTitle] = useState("Home");

  const handleTitleChange = (newTitle) => {
    setHeaderTitle(newTitle);
  }
  

  return (
    <div className='bg-maincolor min-h-screen'>
      <Header title={headerTitle}/>
      <Sidebar onTitleChange={handleTitleChange}/>
      <Outlet/>
    </div>
  )
}

export default App