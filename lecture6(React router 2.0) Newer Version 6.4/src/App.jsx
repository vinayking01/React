import React from 'react'
import './App.css'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'  // this is for rendering the route elements


function App() {

  return (
    <>
   <Navbar />
    <h2>This is the Welcoming Msg for this Below page</h2>
    <div>
      This section is Four rendering the route component
      <Outlet />
    </div>
    <div style={{ border: '10px dashed blue', padding: '10px', width: "130px", height: '130px',  margin: 'auto' }}>
     No effect will take place here
    </div>
   
    </>
  )
}

export default App
