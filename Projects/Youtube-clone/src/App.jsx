import React, { useState, useCallback, Children } from 'react';
import cors from 'cors'

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
import NavBarWrapper from './navBarWrapper'
import Auth from './AuthLayout';
import SearchScreen from './Pages/Search/Searchscreen';
import Trending from './Pages/Trending/Trending';
import Subscription from './Pages/Subscription/Subscription'
import { Feeds } from './Components/Feeds/Feeds';
import LikedVideos from './Pages/Liked/LikedVideos';
import History from './Pages/History/History';


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
                <Home small_sidebar={sidebar} setSidebar={handleSetSidebar} />
              </NavBarWrapper>
            </Auth>
          }
        >
          {/* Default route to Feeds */}

        </Route>
        <Route
          path="/watch/:categoryId/:videoId/:channelId"
          element={
            <Auth >
              <NavBarWrapper setSidebar={handleSetSidebar}>
                <Watchscreen small_sidebar={sidebar} setSidebar={handleSetSidebar} />
              </NavBarWrapper>
            </Auth>
          }
        />
        <Route
          path="/search/:query"
          element={
            <Auth>
              <NavBarWrapper setSidebar={handleSetSidebar}>
                <SearchScreen small_sidebar={sidebar} setSidebar={handleSetSidebar} />
              </NavBarWrapper>
            </Auth>
          }
        />
        <Route path="/subscription" element={
          <Auth >
          <NavBarWrapper setSidebar={handleSetSidebar}>
            <Subscription small_sidebar={sidebar} setSidebar={handleSetSidebar} />    
          </NavBarWrapper>
        </Auth>} />
        <Route path="/feed" element={<Auth >
          <NavBarWrapper setSidebar={handleSetSidebar}>
            <Feeds small_sidebar={sidebar} setSidebar={handleSetSidebar}  />    
          </NavBarWrapper>
        </Auth>} />
        <Route path="/likedVideos" element={<Auth >
          <NavBarWrapper setSidebar={handleSetSidebar}>
            <LikedVideos small_sidebar={sidebar} setSidebar={handleSetSidebar}  />    
          </NavBarWrapper>
        </Auth>} />
        <Route path="/history" element={
          <Auth >
          <NavBarWrapper setSidebar={handleSetSidebar}>
            <History small_sidebar={sidebar} setSidebar={handleSetSidebar}  />    
          </NavBarWrapper>
        </Auth>} />
        
        <Route
          path="/trending/:query"
          element={
            <Auth>
              <NavBarWrapper setSidebar={handleSetSidebar}>
                <Trending small_sidebar={sidebar} setSidebar={handleSetSidebar} />
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
