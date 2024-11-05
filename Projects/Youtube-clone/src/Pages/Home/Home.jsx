import React, { useState } from 'react'
import './Home.css'
import Navbar from '../../Components/NavBar/Navbar'
import Sidebar from '../../Components/SideBar/Sidebar'
import {Feeds} from '../../Components/Feeds/Feeds'

function Home({sidebar}) {
    const [category,setCategory] = useState(0);

    return (
        <>
        {/* <div className='flex'> */}
        <Sidebar small_sidebar={sidebar} category={category}  setCategory={setCategory} /> 
        <div className={`container  w-[85%] ${sidebar ? "large-container" : ""}`}>
            <Feeds category={category} />
        </div>
        {/* </div>     */}
        </>


    )
}

export default Home