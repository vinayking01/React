import {configureStore} from '@reduxjs/toolkit';
import  AuthSliceReducer from './authSlice';

// in this store pass the various reducer you have created

export const store = configureStore({
    
    reducer : AuthSliceReducer
})