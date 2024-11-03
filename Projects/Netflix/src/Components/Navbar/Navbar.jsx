import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import Search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import drop_down_icon from '../../assets/caret_icon.svg'
import { logOut } from '../../firbase_authService'
import { useRef } from 'react'


function Navbar() {
  const [ishover, SetIsHovered] = useState(false);
  const navRef = useRef()

  useEffect(()=>{
   if( navRef.current)
   { window.addEventListener('scroll',()=>{
      if(window.scrollY >=80)
      {
        navRef.current.classList.add('bg-black');
        // console.log("sc")
      }
      else
        {
          navRef.current.classList.remove('bg-black');
          // console.log("scroll")
        }
    })
  }

  },[])


  return (
    <>
      <div className='nav-bar flex justify-between m-2 h-16 pl-16' ref={navRef}>
        {/* left side logo of netflix */}
        <div className='nav-bar-left ml-7 flex  items-center '>
          <div className='flex items-center w-24 h-16 mx-4'>
            <img src={logo} alt="Netflix" className='center w-32 h-8' />
          </div>
          <div className='nav-bar-middle '>
            <ul className='flex justify-evenly gap-3'>
              <li><a href="">Home</a></li>
              <li><a href="">TV Shows</a></li>
              <li><a href="">Movies</a></li>
              <li><a href="">My List</a></li>
              <li><a href="">Browse by Languages</a></li>
            </ul>
          </div>
        </div>

        <div className='navbar-right flex items-center gap-3 mx-4 '>
          <div>
            <div className='flex'>
              <a href=""> <img src={Search_icon} alt="" /></a>
            </div>
          </div>
          <div>
            <img src={bell_icon} alt="" />
          </div>
          <div className='flex gap-2 relative group py-3'>
            <img src={profile_icon} alt="" height={24} width={20} />
            <img src={drop_down_icon} alt="" />
              <div className='absolute -bottom-8 right-0  mt-2 bg-red-500 text-white px-1 py-2 rounded w-24 hidden  group-hover:inline-block   '>
                <button type='submit' onClick={()=> logOut()} className=' '> Sign Out </button>
              </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  )

}

export default Navbar
