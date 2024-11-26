import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    channels : false,
    loading : false
  };


export const SubscriptionSlice = createSlice({
    name : "SubscriptionsDetail",
    initialState,
    reducers:{
        Subscription_Request : (state) =>
        {
            state.loading = true;
        },
        Subscription_success : (state , action) =>{
            state.loading = false;
            state.channels = action.payload;
        },
        
    }
})

  
export const {Subscription_Request , Subscription_success } = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;