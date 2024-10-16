import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/CounterSlice'


// What it does: This function creates a Redux store to hold your entire app’s state.
// Why we need it: Redux stores the app’s state centrally, so every component can access and modify it.

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})


