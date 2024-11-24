import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase_configuration.js';

import { useSelector } from 'react-redux';

function Auth({ children }) {
  const [loader, setLoader] = useState(true);  // Initialize loader to true
  const navigate = useNavigate();
  const [user_data, setSession] = useState(sessionStorage.getItem('user_session'));  // Correctly access Redux state

  useEffect(() => {
    if (!user_data) {
      navigate('/login');  // Navigate to login if no accessToken
    }
    setLoader(false);  // Stop the loading state after checking accessToken
  }, []);

  return loader ? <h1>...Loading</h1> : <>{children}</>;  // Show loading or children based on loader state
}

export default Auth;
