import React from 'react';
import './Sidebar.css';
import home from '../../assets/home.png';
import like from '../../assets/like.png';
import blogs from '../../assets/blogs.png';
import history from '../../assets/history.svg';
import library from '../../assets/library.png';
import { app } from "../../firebase_configuration";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setSideCategory } from '../../Store/SideCateogrySlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Sidecategories = [
  { value: 0, icon: home, name: 'Home', slug: ''},
  { value: 1, icon: blogs, name: 'Subscriptions', slug: 'subscription'},
  { value: 2, icon: like, name: 'Liked Videos', slug: 'Likedvideos' },
  { value: 3, icon: history, name: 'History', slug: 'history'},
  { value: 4, icon: library, name: 'Library' }

];


function Sidebar_box({ small_sidebar, setSidebar}) {
  const navigate  =  useNavigate();
  const Dispatch = useDispatch();
  const SideCategory = useSelector((state) => state.sideCategory.value);

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
        {Sidecategories.map((cat) => (
          <div
            key={cat.value}
            className={`sidelinks ${SideCategory === cat.value ? 'active' : ''}`}
            onClick={() => {
              // setCategory(cat.id);
              Dispatch(setSideCategory(cat.value))
              navigate(`/${cat.slug}`);
             
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
