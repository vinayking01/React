import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const navigate = useNavigate();

  useEffect(() => {
    // checking whether user is already logged in or not
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        navigate('/')
      }
      else {
        console.log("logged out")
        navigate('/login')
      }
    })
  }, [])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2995}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </>
  )
}

export default App
