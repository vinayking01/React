import React, { useState, useCallback, Children } from 'react';

import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home/Home';
import Watchscreen from './Pages/Watchscreen/Watchscreen';
import LoginPage from './Pages/Login/LoginPage';
import BrokenLinkPage from './Pages/BrokenLink'
import Signup from './Components/Sign Up/Signup';
import NavBarWrapper from './navBarWrapper'
import Auth from './AuthLayout';

function App() {
  const [sidebar, setSidebar] = useState(false);

  // Memoize setSidebar function to avoid unnecessary re-renders
  const handleSetSidebar = useCallback((value) => setSidebar(value), []);
  

  const MyRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <Auth >
              <NavBarWrapper setSidebar={handleSetSidebar}>
                <Home sidebar={sidebar} setSidebar={handleSetSidebar} />
              </NavBarWrapper>
            </Auth>
          }
        />
        <Route
          path="/watch/:categoryId/:videoId/:channelId"
          element={
            <Auth >
            <NavBarWrapper setSidebar={handleSetSidebar}>
              <Watchscreen sidebar={sidebar} setSidebar={handleSetSidebar}/>
            </NavBarWrapper>
            </Auth>
          }
        />
        <Route
          path="/search/:query"
          element={
            <Auth>
            <NavBarWrapper setSidebar={handleSetSidebar}>
              <Home sidebar={sidebar} />
            </NavBarWrapper>
            </Auth>
          }
        />

        {/* Routes without Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<BrokenLinkPage />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={MyRouter} />
    </>
  );
}

export default App;
