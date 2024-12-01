import React, { useEffect, useState } from 'react';
import './Home.css';
import Sidebar_box from '../../Components/SideBar/Sidebar';
import { Feeds } from '../../Components/Feeds/Feeds';
import { Outlet, useParams } from 'react-router-dom';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import { setSideCategory } from '../../Store/SideCateogrySlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

function Home({ small_sidebar ,setSidebar}) {
  const Dispatch = useDispatch();

  useEffect(()=>{
    Dispatch(setSideCategory(0))
  },[])

  return (
    <div className=''>
      {/* categories Sidebar Section */}
      <Sidebar_box
        small_sidebar={small_sidebar}
        setSidebar= {setSidebar}
      />

      <div className={`Top-category-Bar flex flex-row w-[100%] top-[70px] z-[1] ${small_sidebar ? `sm:ml-[79px]`:`sm:ml-[200px]`}  bg-white fixed gap-3 `}>
        <CategoryBar />
      </div>

      {/* Feed Section */}
      <div className={`container w-[100%] ${small_sidebar ? 'large-container' : ''}`}>
      <Feeds  small_sidebar={small_sidebar} setSidebar= {setSidebar}/>
      </div>
    </div>
  );
}

export default Home;


// Optimizations
// 1. Destructure Params directly to get query: Avoid redundant calls to Params.query.
// 2. Params.query logic directly into setQuery: Skip the need for a separate state (query) by passing Params.query directly to Feeds.

