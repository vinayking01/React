import {configureStore} from '@reduxjs/toolkit';
import  AuthSliceReducer from './authSlice';
import SubscriptionSlice from './SubscriptionSlice'

// in this store pass the various reducer you have created

export const store = configureStore({
    
    reducer: {
        auth: AuthSliceReducer, // Add the auth reducer here
        SubscriptionsDetail : SubscriptionSlice
      },
    // devTools: process.env.NODE_ENV !== 'production',  // just for the checking of state a tool for visualisation during developement
})