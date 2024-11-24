import {configureStore} from '@reduxjs/toolkit';
import  AuthSliceReducer from './authSlice';


// in this store pass the various reducer you have created

export const store = configureStore({
    
    reducer: {
        auth: AuthSliceReducer // Add the auth reducer here
      },
    // devTools: process.env.NODE_ENV !== 'production',  // just for the checking of state a tool for visualisation during developement
})