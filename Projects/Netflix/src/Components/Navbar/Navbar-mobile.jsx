import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import Search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import drop_down_icon from '../../assets/caret_icon.svg'
import { logOut } from '../../firbase_authService'
import { useRef } from 'react'
import hamburger from '../../assets/hamburger.svg'
import cross_Cut from '../../assets/cross_cut.svg'

function Navbar_Mobile() {
    const [ishover, SetIsHovered] = useState(false);
    const navRef = useRef()
    const [side_hamburger ,SetHamburger] = useState(true);

    useEffect(() => {
        if (navRef.current) {
            window.addEventListener('scroll', () => {
                if (window.scrollY >= 80) {
                    navRef.current.classList.add('bg-black');
                    // console.log("sc")
                }
                else {
                    navRef.current.classList.remove('bg-black');
                    // console.log("scroll")
                }
            })
        }

    }, [])


    return (
        <>
            <div className='nav-bar flex justify-between m-2 p-3 h-auto pl-1' ref={navRef}>
                {/* left side logo of netflix */}
                <div className='nav-bar-left ml-1 flex  items-center '>
                    <div className='flex items-center w-18 h-5 mx-4'>
                        <img src={logo} alt="Netflix" className='center w-32 h-8' />
                    </div>
                </div>
                {(side_hamburger) ?<div className='text-right'>
                    <img src={hamburger} alt="hamburger" className='cursor-pointer w-12 h-5' onClick={()=>{
                        SetHamburger(false)
                    }} />
                </div> : <div className='navbar-right flex flex-col bg-black absolute right-0 -top-2 h-[100vh] gap-5 '>
                <img src={cross_Cut} alt="cross-cut" className='cursor-pointer w-10 h-5 m-2' onClick={()=>{
                        SetHamburger(true)
                    }} />
                    <div className='ml-1 flex '>
                        <div className='nav-bar-middle '>
                            <ul className='flex flex-col items-center gap-4 py-3'>
                                <li><a href="">Home</a></li>
                                <li><a href="">TV Shows</a></li>
                                <li><a href="">Movies</a></li>
                                <li><a href="">My List</a></li>
                                <li><a href="">Browse by Languages</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <div>
                            <div className=''>
                                <a href=""> <img src={Search_icon} alt="" /></a>
                            </div>
                        </div>
                        <div className='flex gap-2 relative group py-3'>
                            <img src={profile_icon} alt="" height={24} width={20} />
                            <img src={drop_down_icon} alt="" />
                            <div className='absolute -bottom-8 right-0  mt-2 bg-red-500 text-white px-1 py-2 rounded w-24 hidden  group-hover:inline-block   '>
                                <button type='submit' onClick={() => logOut()} className=' '> Sign Out </button>
                            </div>
                        </div>
                    </div>

                </div> }  

            </div>
        </>
    )

}

export default Navbar_Mobile;
