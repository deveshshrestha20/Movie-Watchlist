import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import WatchList from './components/Pages/WatchList.jsx';
import WatchedList from './components/Pages/WatchedList.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "watchlist",
        element: <WatchList/>
      },
      {
        path: "watchedlist",
        element: <WatchedList/>
      }
    ]
  },
  
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
