## Redux vs Redux-toolkit  
1. Redux: ( Old way complex Structure)
- Redux is an independent state management library. It helps manage the global state of an application in a predictable way, but it is not tied to React specifically.

2. Redux-toolkit : (New Library)
- Redux Toolkit is the official, modern way to write Redux logic easily and with less boilerplate.


## Q: React-Redux What is this? Is it must to use along with redux or redux-toolkit?
- React-Redux is a separate library that connects Redux with React, allowing React components to interact with the Redux store.
- Yes, React-Redux is still required to connect your React components to the Redux store, regardless of whether you use plain Redux or Redux Toolkit.


## Q:  Why Redux Toolkit was introduced:
- Redux Toolkit was introduced primarily to solve the issues and pain points developers faced when using the traditional Redux library. Here’s a summary of why Redux Toolkit was created and what problems it addresses like:
1. Too Much Boilerplate Code in Redux.
2. Complex Store Configuration.


## Redux Toolkit : In modern time it is used mostly.
- Redux Toolkit is the official, modern way to write Redux logic easily and with less boilerplate.
- In Redux Toolkit/ Redux we usually manage different pieces of state (called slices) independently. Each slice has its own reducer and related actions. means multiple slice for different state variables handling. Each slice is responsible for managing its own specific piece of state, and comes with actions and reducers that update that specific piece of state.
- It reduces boilerplate and ensures best practices are followed by default.
- It's the recommended way to use Redux, especially for new projects, as it simplifies the process while still providing the full power of Redux.

- `Installation`
``` js
npm install @reduxjs/toolkit
npm install react-redux

```
- In short this is the flow -> UI Event → dispatch(action) → reducer updates state → store changes → selectors get updates → components re-render.

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
`Step 1`: Create a Store — The Big “State Box” - The store is like your main box where all application data is kept.

`Store.js`
``` js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,  // Manages the 'counter' state
    user: userSlice.reducer,        // Manages the 'user' state
  },
});
```

`Step 2:` Create Slices — The Small Drawers
- Each "slice" is a drawer: holds related state and knows how to update it.
- Use createSlice() to define:
  - Drawer name, initial state
  - How the data inside changes (reducers)
  - Actions are auto-generated!

`CounterSlice.js`  
``` js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});
```

`UserSlice.js` (manages the user state):
``` js
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


`Step 3:` Put the Store on Your React App’s Shelf
- Wrap your entire app (or the subtree you want) in the <Provider store={store}>.
```js
  <Provider store={store}>
    <App />
  </Provider>
```

`Step 4:` Use State & Update State in Components
- Use useSelector() to open a drawer and see what’s inside.
- Use useDispatch() to put instructions (actions) in the box for state changes.


## Flow 
![Screenshot (89)](https://github.com/user-attachments/assets/ca1e7ab3-c41b-45de-985b-7482562f1155)
![Screenshot (90)](https://github.com/user-attachments/assets/31c04215-32bc-4f91-b5ac-e5007cf061d5)


## Q: Redux State & Immutability: Complete Understanding why redux follow the principle of immutability in their State.
- Immutability means you do not mutate existing objects but create new objects representing updated state.

1.  Where & How Redux Stores State
  - Redux holds your application state values in a single immutable store object.
  - This store is the source of truth, accessed by components to render UI.
  - It follows one principle of immutability for their Store. Redux app state must be immutable — never mutate the current state object directly.
  - Why? Because Redux detects changes in state by checking if the state object reference has changed. See below state always takes object.

  ```js 

  const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 , name :"Avi" },   // The values are stored in object always 
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }})
  ```
2. Example of Breaking Immutability (Incorrect)
  -   Suppose you have the state which stored the object like {value : 0 , name :"Avi}. Now you when you perform the increment operation you do (state) => { state.value += 1; } , which actually increases the value but object reference remain same. It looks like you are only changing value . Looks same under the hood if redux-toolkit won't handle this issue, this can cause serious problem because the actual reference of object is remain same and react thinks nothing have changed and won't re-render. But luckily redux handle this internally. 
  - `Problem`: Redux will not detect this change because the object reference is the same.

3. Example of Following Immutability (Correct)

```js 
// Initial state
state = { value: 0 };

// Correct immutable update by creating a new object and passing it back. Redux detects update, React components re-render.

return {
  ...state,
  value: state.value + 1
};

```

4.  How Redux Toolkit Simplifies Immutability
- Redux Toolkit uses Immer internally. Lets you write mutation-like code but creates new immutable state behind the scenes
- Immer allows writing code that looks like direct mutation of state (e.g., state.value += 1).
- Immer wraps current state with a proxy draft object.
- Mutations are applied to the draft object.
- Immer automatically produces a new immutable state based on draft changes.
- You get the benefit of immutability without boilerplate.