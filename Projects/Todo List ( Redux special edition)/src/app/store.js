import {configureStore} from '@reduxjs/toolkit';
import tododReducer from '../app/features/todo/todoSlice'

// in this store pass the various reducer you have created

export const store = configureStore({

    reducer : tododReducer
})