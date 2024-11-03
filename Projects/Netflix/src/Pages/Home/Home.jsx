import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_ico from '../../assets/play_icon.png'
import info_ico from '../../assets/info_icon.png'
import Titlecards from '../../Components/Titlecards/Titlecards'
import Footer from '../../Components/Footer/Footer'
// import Navbar_Mobile from '../../Components/Navbar/Navbar-mobile'

import '../../App.css'


function Home() {


  return (
    <>
      <div className='relative'>
        <div className={`sticky -top-1  z-10`} >
        <Navbar />
        {/* <Navbar_Mobile/> */}
        </div>
       {/* background image */}
        <div className='hero  relative -top-24 w-[100%]'>
          <img src={hero_banner} alt=" hero banner" className='hero-banner w-full h-auto mask-image' />
        </div>
        {/* banner image */}
        <div className='hero-caption absolute top-44 left-28 w-2/4' >
          <img src={hero_title} alt="hero-tile" className=' w-[50%] ' />
          <br></br>
          <p> Before passing through the Banihal tunnel, one has to pass through a stretch of road simply known as Khooni Nala. Here the human race battles the powerful forces of nature. And you can almost see this struggle.</p>
          <br />
          <div className='flex gap-5'>
            <button type="button" className='bg-white py-1 px-2 text-black flex items-center'><img src={play_ico} width={20} height={24} alt="" /> Play</button>
            <button type="button" className='bg-slate-800 py-1 px-2  flex items-center'><img src={info_ico} width={20} height={24} alt="" /> More Info</button>
          </div>
        </div>
        {/* <div className=' w-[93.5%] relative bottom-96 left-24 '>
          <Titlecards />
        </div> */}
        {/* <div className='more-cards w-[93.5%] relative flex flex-col -top-52 left-24 gap-y-12'>
          <Titlecards title={"Popular BlockBuster Movies"} category={"popular"}/>
          <Titlecards title={"Only on Netflix Top Rated"} category={"top_rated"}/>
          <Titlecards title={"Upcoming"} category={"upcoming"}/>
        </div> */}
      </div>
      <div className='relative'>
        {/* <Footer /> */}
      </div>
    </>

  )
}

export default Home