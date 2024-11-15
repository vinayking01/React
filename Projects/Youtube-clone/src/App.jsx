import React, { useState } from 'react'
import Navbar from './Components/NavBar/Navbar'
import './App.css'
import { Route , Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Player from './Pages/Player/Player'

function App() {
  const [sidebar, SetSidebar] = useState(false);
  return (
    <div>
      <Navbar Setsidebar={SetSidebar} />
      <Routes>
        <Route path='/'  element={<Home sidebar={sidebar} />}/>
        <Route path='/video/:categoryId/:videoId/:channelId' element={<Player />} />
        <Route path='/search/:query' element={<Home sidebar={sidebar} />}/>
      </Routes>
      
    </div>
  )
}

export default App
