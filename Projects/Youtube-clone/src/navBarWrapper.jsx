import React from 'react'
import Navbar from './Components/NavBar/Navbar';

 const NavBarWrapper = ({children, setSidebar}) =>{
  return (
    <>
    <Navbar setSidebar={setSidebar} />
    <main>{children}</main>
    </>
    
  )
}

export default NavBarWrapper

