import React from 'react';
import './Sidebar.css';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/blogs.png';
import blogs from '../../assets/news.png';
import news from '../../assets/news.png';
import jack from '../../assets/jack.png';
import simon from '../../assets/simon.png';
import tom from '../../assets/tom.png';

const categories = [
  { id: 0, icon: home, name: 'Home' },
  { id: 20, icon: game_icon, name: 'Gaming' },
  { id: 2, icon: automobiles, name: 'Automobiles' },
  { id: 17, icon: sports, name: 'Sports' },
  { id: 24, icon: entertainment, name: 'Entertainment' },
  { id: 28, icon: tech, name: 'Technology' },
  { id: 10, icon: music, name: 'Music' },
  { id: 22, icon: blogs, name: 'Blogs' },
  { id: 25, icon: news, name: 'News' }
];

function Sidebar({ small_sidebar, category, setCategory, setQuery }) {
  return (
    <div className={`sidebar w-[15%] ml-1 h-[100vh] fixed top-16 pl-4 pt-1 mt-4 bg-white ${small_sidebar ? "small-sidebar" : ""}`}>
      <div className="shortcut-links">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`sidelinks ${category === cat.id ? 'active' : ''}`}
            onClick={() => {
              setCategory(cat.id);
              setQuery("");  // Reset query when a category is selected
            }}
          >
            <img src={cat.icon} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
        <hr />
      </div>
      <div className='subscribed-list'>
        <h3 className='text-lg my-5 text-gray-500'>Subscribed</h3>
        <div className='sidelinks'>
          <img src={jack} alt="PewDiePie" /> <p>PewDiePie</p>
        </div>
        <div className='sidelinks'>
          <img src={simon} alt="MrBeast" /> <p>MrBeast</p>
        </div>
        <div className='sidelinks'>
          <img src={tom} alt="Justin Bieber" /> <p>Justin Bieber</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
