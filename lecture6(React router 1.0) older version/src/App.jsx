import React from 'react'
import './App.css'
import Navbar from './navbar'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Navbar />
    <h2>This is the Welcoming Msg for this Below page</h2>
    
    {/*  when i click on these routes it doesn't chg the whole page data , it changes( render ) only the routes data which is required  */}
    <Routes>
    <Route index element={<Home />} />  {/* Either you can use / or 'index' - both means here that first page during the starting of the routes wll always starts from here */}
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About/>} />
    </Routes>
    <div style={{ border: '10px dashed blue', padding: '10px', width: "130px", height: '130px',  margin: 'auto' }}>
     No effect will take place here
    </div>
    </>
    
  )
}

export default App
