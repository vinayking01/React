// This function helps create a "slice" of the Redux state, with the logic to modify it (reducers) and the actions that trigger those changes.

import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'counter',
  initialState : {value : 0},

//Reducers : These are the functions inside reducers in createSlice. They define how the state should change when an action happens.
  reducers: {
    // Under reducer you define your actions : They describe what should happen (e.g., increase the counter) but don’t directly modify the state.
    // All these actions are only related to the counter , all these actions should are only related to the counter slice 
    // In Redux, we usually manage different pieces of state (called slices) independently. Each slice has its own reducer and related actions.
    
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    Reset : (state)=>{
        state.value = 0;
    },
    incrementByAmount: (state, action) => {
      state.value += Number(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount , Reset } = counterSlice.actions

export default counterSlice.reducer



