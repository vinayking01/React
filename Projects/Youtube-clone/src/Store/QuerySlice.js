import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    value : '',
  };


export const QuerySlice = createSlice({
    name : "query",
    initialState,
    reducers:{
        Query_Request : (state) =>
        {
            state.loading = true;
        },
        Query_success : (state , action) =>{
            state.loading = false;
            state.value = action.payload;
        },
        
    }
})

  
export const {Query_Request , Query_success} = QuerySlice.actions;

export default QuerySlice.reducer;