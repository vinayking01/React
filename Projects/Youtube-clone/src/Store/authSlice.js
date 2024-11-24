import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    user : null,
    accessToken : null,
    loading : false
  };


export const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        Login_Request : (state ) =>
        {
            state.loading = true;
        },
        Login_success : (state , action) =>{
            state.loading = false;
            state.accessToken = action.payload;
        },
        Login_fail :(state, action)=>{
            state.loading = false;
            state.error  = action.payload;
            state.accessToken = null;
        },
        Load_profile : (state, action )=>{
            state.user = action.payload;
        }
    }
})

  
export const {Login_Request , Login_success ,Login_fail ,Load_profile} = AuthSlice.actions;

export default AuthSlice.reducer;