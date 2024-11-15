import React, { useEffect } from 'react'
import'./Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/blogs.png'
import blogs from '../../assets/news.png'
import news from '../../assets/news.png'
import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'


function Sidebar({small_sidebar,category,setCategory,setQuery}) {

    // useEffect(,[category])

  return (
    <div className={`sidebar w-[15%] ml-1 h-[100vh] fixed top-16 pl-4 pt-1 mt-4 bg-white ${small_sidebar? "small-sidebar":""}`}>
        <div className="shortcut-links">
            <div className={`sidelinks ${category ===0 ? 'active':""}`} onClick={()=>{
                setCategory(0); setQuery(null); // this is done only for removing the query from the link 
            }}>
                <img src={home} alt="" /> <p>Home</p>
            </div>
            <div className={`sidelinks ${category ===20 ? 'active':""}`} onClick={()=>{
                setCategory(20) ;setQuery("")
            }}>
                <img src={game_icon} alt="" /> <p>Gaming</p>
            </div>
            <div className={`sidelinks ${category ===2 ? 'active':""}`} onClick={()=>{
                setCategory(2) ;setQuery("")
            }}>
                <img src={automobiles} alt="" /> <p>Automobiles</p>
            </div>
            <div className={`sidelinks ${category ===17 ? 'active':""}`} onClick={()=>{
                setCategory(17) ;setQuery("")
            }}>
                <img src={sports} alt="" /> <p>Sports</p>
            </div>
            <div className={`sidelinks ${category ===24 ? 'active':""}`} onClick={()=>{
                setCategory(24);setQuery("")
            }}>
                <img src={entertainment} alt="" /> <p>Entertainment</p>
            </div>
            <div className={`sidelinks ${category ===28 ? 'active':""}`} onClick={()=>{
                setCategory(28);setQuery("")
            }}>
                <img src={tech} alt="" /> <p>Technology</p>
            </div>
            <div className={`sidelinks ${category ===10 ? 'active':""}`} onClick={()=>{
                setCategory(10);setQuery("")
            }}>
                <img src={music} alt="" /> <p>Music</p>
            </div>
            <div className={`sidelinks ${category ===22 ? 'active':""}`} onClick={()=>{
                setCategory(22);setQuery("")
            }}>
                <img src={blogs} alt="" /> <p>Blogs</p>
            </div>
            <div className={`sidelinks ${category ===25 ? 'active':""}`} onClick={()=>{
                setCategory(25);setQuery("")
            }}>
                <img src={news} alt="" /> <p>News</p>
            </div>
            <hr />
        </div>
        <div className='subscribed-list '>
        <h3 className='text-lg my-5 text-gray-500'>Subscribed</h3>
        <div className='sidelinks'>
        <img src={jack} alt="" /> <p>PewDiePie</p>
        </div>
        <div className='sidelinks'>
        <img src={simon} alt="" /> <p>MrBeast</p>
        </div>
        <div className='sidelinks'>
        <img src={tom} alt="" /> <p>Justin Bieber</p>
        </div>
        </div>
    </div>
  )
}

export default Sidebar