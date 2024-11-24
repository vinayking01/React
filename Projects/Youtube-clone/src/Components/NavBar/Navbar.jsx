import React, { useState, useCallback } from 'react';
import menu_icon from '../../assets/menu.png';
import Youtube_logo from '../../assets/logo.png';
import upload from '../../assets/upload.png';
import more_logo from '../../assets/more.png';
import notification from '../../assets/notification.png';
import profile from '../../assets/user_profile.jpg';
import search_icon from '../../assets/search.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';


function Navbar({ setSidebar }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Memoized function to handle search logic
  const findSearch = useCallback(() => {
    if (!query.trim()) return; // Prevent search for empty query
    navigate(`/search/${encodeURIComponent(query)}`);
  }, [query, navigate]);

  // Handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      findSearch(); // Trigger search on Enter key press
    }
  };


 

  return (
    <div>
      <nav className="nav-bar flex flex-row justify-between gap-2 h-[72px] p-4 border-2 border-gray-500 fixed bg-white w-[100%] z-[100]">
        <div className="nav-left flex items-center gap-4">
          <img
            src={menu_icon}
            alt="Menu Icon"
            className="menu-icon"
            onClick={() => setSidebar((prev) => !prev)}
          />
          <Link to="/" className="w-[auto]" onClick={()=>{setQuery(" ")}}>
            <img src={Youtube_logo} alt="YouTube Logo" className="logo w-[50%]" />
          </Link>
        </div>

        <div className="flex nav-middle gap-4 h-auto border-2 border-black rounded-full px-4 items-center">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key
            className="pr-9 text-1xl bg-transparent outline-none w-[400px] placeholder:text-black"
          />
          <img
            src={search_icon}
            alt="Search Icon"
            onClick={findSearch} // Trigger search on icon click
            className="w-[20px] h-[20px]"
          />
        </div>

        <div className="nav-right flex items-center justify-end gap-4">
          <img src={upload} alt="Upload Icon" />
          <img src={more_logo} alt="More Options Icon" />
          <img src={notification} alt="Notification Icon" />
          <img src={profile} alt="User Profile" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;


//  Optimizations done at last are
// 1. Memoize FindSearch using useCallback to avoid unnecessary re-creation.
// 2. Optimize handleKeyDown to avoid redefining FindSearch inside the function.