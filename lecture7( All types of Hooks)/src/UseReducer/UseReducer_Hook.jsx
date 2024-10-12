import { useReducer} from "react";

export function UseReducer_hook() {
 
// Step 1: Define the initial state
    const initialState = {count : 0}

// Step 2: Define the reducer function
    function reducer(state,action) {
        switch(action.type)
        {
            case "INCREMENT" : return {count : state.count +1}; //  When you return { count: state.count - 1 } from the reducer function in your useReducer hook, this new object is passed back into the useReducer hook, which automatically stores it as the new state.
            case "DECREMENT" : return {count : state.count -1};
            default:
      throw new Error();
        }
    }
// Step 4: Initialize useReducer with the reducer function and initial state
    const [state ,dispatch] = useReducer(reducer,initialState)
  
    return (
    <>
        <div>
          <p>{state.count}</p>
          <button onClick={() => dispatch({type : "INCREMENT"})}  >Increment</button>  
          <button onClick={() => dispatch({type : "DECREMENT"})}>Decrement</button>
          <div>
        </div>
        </div>
    </>
  );

}