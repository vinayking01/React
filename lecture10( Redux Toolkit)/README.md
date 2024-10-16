
# Installation
- npm install @reduxjs/toolkit
- npm install react-redux

# Redux vs Redux toolkit  
1. Redux:
- Redux is an independent state management library. It helps manage the global state of an application in a predictable way, but it is not tied to React specifically.
2. React-Redux:
- React-Redux is a separate library that connects Redux with React, allowing React components to interact with the Redux store.

### Why Redux Toolkit was introduced:
- Redux had complexity because of its boilerplate code (manually creating actions, reducers, etc.) and required various additional libraries (like redux-thunk for handling async logic), which made the setup and usage cumbersome.
- To simplify this, Redux Toolkit was introduced. It combines all the necessary tools and utilities into one package, reducing complexity and making state management easier.

## Redux Toolkit : In modern time it is used mostly.
- Redux Toolkit simplifies using Redux by combining multiple Redux-related concepts (store, reducers, actions, etc.) into one streamlined package.
- In Redux Toolkit/ Redux we usually manage different pieces of state (called slices) independently. Each slice has its own reducer and related actions. means multiple slice for different state variables handling. Each slice is responsible for managing its own specific piece of state, and comes with actions and reducers that update that specific piece of state.
- It reduces boilerplate and ensures best practices are followed by default.
- It's the recommended way to use Redux, especially for new projects, as it simplifies the process while still providing the full power of Redux.

## Important term 
In summary:
- Store: The central place where all state is kept.
- configureStore: Creates the Redux store.
- createSlice: Defines a part of the state and the reducers (logic) that can update it.
- reducers: Functions inside the slice that change the state , which actually stores the logic.
- actions: Triggers changes in the state.
- useSelector: Lets components read state from the store.
- useDispatch: Lets components send actions to modify the state with payload.
- Provider: Makes the store accessible to all components, Inside this we Wrap our component.



### Syntax of Multiple Slice handling 
- Store.js
```
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,  // Manages the 'counter' state
    user: userSlice.reducer,        // Manages the 'user' state
  },
});
```

- Counter Slice (manages the counter state):
```
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});
```

- User Slice (manages the user state):
```
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
    },
  },
});
```

## Flow 
![Screenshot (89)](https://github.com/user-attachments/assets/ca1e7ab3-c41b-45de-985b-7482562f1155)
![Screenshot (90)](https://github.com/user-attachments/assets/31c04215-32bc-4f91-b5ac-e5007cf061d5)




