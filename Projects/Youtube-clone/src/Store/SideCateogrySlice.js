import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    value : 0
  };


export const SideCategorySlice = createSlice({
    name : "sideCategory",
    initialState,
    reducers:{
        setSideCategory : (state,action) =>
        {
            state.value = action.payload;
        }
    }
})

  
export const {setSideCategory} = SideCategorySlice.actions;

export default SideCategorySlice.reducer;