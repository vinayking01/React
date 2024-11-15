import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../Components/NavBar/Navbar'
import Sidebar from '../../Components/SideBar/Sidebar'
import {Feeds} from '../../Components/Feeds/Feeds'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function Home({sidebar}) {
    const [category,setCategory] = useState(0);
    const Params= useParams();
    const [query, setQuery] = useState(null);

    console.log(category)
    useEffect(()=>{
        setQuery(Params.query)
    },[Params.query])

    return (
        <>
        <Sidebar small_sidebar={sidebar} category={category}  setCategory={setCategory} setQuery={setQuery}/> 
        
        <div className={`container  w-[85%] ${sidebar ? "large-container" : ""}`}>
        {/* <h2>My query {query}</h2> */}
            <Feeds category={category} search={query} />
        </div>

        </>


    )
}

export default Home