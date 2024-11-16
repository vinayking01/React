import React, { useState } from 'react';
import './Home.css';
import Sidebar from '../../Components/SideBar/Sidebar';
import { Feeds } from '../../Components/Feeds/Feeds';
import { useParams } from 'react-router-dom';

function Home({ sidebar }) {
  const [category, setCategory] = useState(0);
  const { query } = useParams(); // Destructure query directly

  return (
    <div>
      {/* categories Sidebar Section */}
      <Sidebar
        small_sidebar={sidebar}
        category={category}
        setCategory={setCategory}
        setQuery={() => {}} // Removed unused setQuery dependency
      />

      {/* Feed Section */}
      <div className={`container w-[85%] ${sidebar ? 'large-container' : ''}`}>
        <Feeds category={category} search={query} />
      </div>
    </div>
  );
}

export default Home;


// Optimizations 
// 1. Destructure Params directly to get query: Avoid redundant calls to Params.query.
// 2. Params.query logic directly into setQuery: Skip the need for a separate state (query) by passing Params.query directly to Feeds.
