import React from 'react';
import './Sidebar.css';
import home from '../../assets/home.png';
import like from '../../assets/like.png';
import blogs from '../../assets/blogs.png';
import history from '../../assets/history.svg';
import library from '../../assets/library.png';
import { app } from "../../firebase_configuration";
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const categories = [
  { id: 0, icon: home, name: 'Home' },
  { id: 1, icon: blogs, name: 'Subscriptions' },
  { id: 2, icon: like, name: 'Liked Videos' },
  { id: 3, icon: history, name: 'History' },
  { id: 4, icon: library, name: 'Library' }

];


function Sidebar_box({ small_sidebar, category, setCategory, setQuery , setSidebar}) {
  const navigate  =  useNavigate();

  const Logout = () => {

    sessionStorage.removeItem('user_session');
    console.log("Log out successfully") ;
    navigate('/login');  // Navigate to login if no accessToken
  }
  
  useEffect(() => {

      if (window.innerWidth < 640) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
  }, []);

  return (
    <div className={`sidebar w-[200px] ml-0 h-[100vh] z-[10] fixed top-16 pl-4 pt-4 bg-white ${small_sidebar ? "small-sidebar" : ""}`}>
      <div className="shortcut-links">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`sidelinks ${category === cat.id ? 'active' : ''}`}
            onClick={() => {
              setCategory(cat.id);
              setQuery("");  // Reset query when a category is selected
              setSidebar((prev) => !prev)
            }}
          >
            <img src={cat.icon} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
        <hr />
      </div>
      <div className='buttons'>
        <div className='isloggedIn sidelinks' onClick={Logout}>
         <h2>Log Out</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar_box;
