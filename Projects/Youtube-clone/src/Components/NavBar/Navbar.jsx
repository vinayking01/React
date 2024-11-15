import React, { useState } from 'react'
import menu_icon from '../../assets/menu.png'
import Youtube_logo from '../../assets/logo.png'
import upload from '../../assets/upload.png'
import more_logo from '../../assets/more.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/user_profile.jpg'
import search_icon from '../../assets/search.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar({ Setsidebar }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Function to handle search logic
  const FindSearch = async () => {
    if (!query.trim()) return;  // Prevent search for empty query
    
    navigate(`/search/${encodeURIComponent(query)}`);

  };

  // Handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      FindSearch();  // Trigger search on Enter key press
    }
  };

  return (
    <div>
      <nav className='nav-bar flex flex-row justify-between gap-2 h-[72px] p-4 border-2 border-gray-500 fixed bg-white w-[100%]'>
        <div className="nav-left flex items-center gap-4">
          <img src={menu_icon} alt="" className="menu-icon" onClick={() => {
            Setsidebar(Prev => !Prev);
          }} />
          <Link to='/'><img src={Youtube_logo} alt="" className="logo" /> </Link>
        </div>

        <div className="flex nav-middle gap-4 h-auto border-2 border-black rounded-full px-4 items-center">
          <input
            type="text"
            placeholder='Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key
            className='pr-9 text-1xl bg-transparent outline-none w-[400px] placeholder:text-black'
          />
          <img
            src={search_icon}
            alt="Search Icon"
            onClick={FindSearch}  // Trigger search on icon click
            className='w-[20px] h-[20px]'
          />
        </div>

        <div className="nav-right flex items-center justify-end gap-4">
          <img src={upload} alt="" />
          <img src={more_logo} alt="" />
          <img src={notification} alt="" />
          <img src={profile} alt="" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;