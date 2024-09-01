import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ApiFetch from './components/apiFetch';

function App() {
  const [headerTitle, setHeaderTitle] = useState("Home");
  const [query, setQuery] = useState(''); // Manage the search query state
  const location = useLocation();

  const handleTitleChange = (newTitle) => {
    setHeaderTitle(newTitle);
  };

  return (
    <div className='bg-maincolor min-h-screen'>
      <Header title={headerTitle} setQuery={setQuery} /> {/* Pass setQuery to Header */}
      <Sidebar onTitleChange={handleTitleChange} />
      {location.pathname === "/" && <ApiFetch query={query} />} {/* Pass query to ApiFetch */}
      <Outlet />
    </div>
  );
}

export default App;
