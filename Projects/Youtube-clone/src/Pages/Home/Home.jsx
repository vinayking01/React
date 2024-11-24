import React, { useState } from 'react';
import './Home.css';
import Sidebar_box from '../../Components/SideBar/Sidebar';
import { Feeds } from '../../Components/Feeds/Feeds';
import { useParams } from 'react-router-dom';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';

function Home({ sidebar ,setSidebar}) {
  const [category, setCategory] = useState(0);
  const { query } = useParams(); // Destructure query directly
  console.log("query", query)

  return (
    <div className=''>
      {/* categories Sidebar Section */}
      <Sidebar_box
        small_sidebar={sidebar}
        category={category}
        setCategory={setCategory}
        setQuery={() => { }} // Removed unused setQuery dependency
        setSidebar= {setSidebar}
      />

      <div className={`Top-category-Bar flex flex-row w-[100%] top-[70px] z-[1] ${sidebar ? `sm:ml-[79px]`:`sm:ml-[200px]`}  bg-white fixed gap-3 `}>
        <CategoryBar />
      </div>

      {/* Feed Section */}
      <div className={`container w-[100%] ${sidebar ? 'large-container' : ''}`}>
        <Feeds category={category} search={query ? query : null} small_sidebar={sidebar} />
      </div>
    </div>
  );
}

export default Home;


// Optimizations
// 1. Destructure Params directly to get query: Avoid redundant calls to Params.query.
// 2. Params.query logic directly into setQuery: Skip the need for a separate state (query) by passing Params.query directly to Feeds.

