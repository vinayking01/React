# * State in React JS
1. In react, State refers to an object that holds data or information about the component . State is managed within the component ( just like variable declared ina a function ). however , unlike regular variables , when state changes , Rect re-enders the component to reflect these changes , Keeping the user interface in sync with the data.
2. Benefit of using it is if we have used that value in many places it will change automatically everywhere when value is changed at single place.
2. State is dynamic and mutable , meaning it can change over the time in response to user action , server responses or other.

    ### Syntax
    ```
        import React, { useState } from 'react';

    const ExampleComponent = () => {
    // Declare a state variable named 'count' with an initial value always inside useState()  which depends on what type of data you are handling 
    const [count, setCount] = useState(0);

    return (
        <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
    };

    export default ExampleComponent;
    ```

    ## (a) State 
    In React, State is a way to store and manage data that can be change over the lifetime of  a component. when the state changes react re-renders the component to reflect the new state.
    ## (B) Hook
    Hooks are functions that let you "hook into" React state and lifecycle features from function components. They enable you to use state and other React features without writing a class.
    eg - useState()
    ### (B) Use State() Function 
    It actually return an array of two items, current state value and a function to update that value.
    
## Note How rendering works?
1. Initial Renders - when the app component first renders, React renders the Parent , sibling and all child components.
2. State Change in parent Component - React will render Parent component and all child component except the sibling component. (koi bhi parent component ke andar ki state chg krte hai toh pura component with child component dubara new state ke sath re - render hoga .)
3. State change in Child Component - if state chg in child component then it will re-render all there descendents only. Even parent component will also not re-render.

# * Derived State Concept in react
Derived State is any state that can be computed based on other state or props. It is not necessarily required the the result of computation in state but it is calculated when needed. 
If the data you are storing is the type of array or object then you can use all the basic computation methods as available in js this is the concept of Derived state from the state in React.

ex - const userCount = user.length ;

# * Lifting the State Up Concept in React
1. Lifting State Up is a pattern in React where you move the state from child components to a common parent component so that multiple child components can share and synchronize this state. This use case occurs when you want to pass data from one child component to other child component. This is one of the way to resolve this issue. We will see more in future about this.


## Very Important Concept - How flow execution go in React -
1. Initial Render: When a React component first loads, it renders the UI based on the initial state.
2. Hooks Execution: After the initial render, React runs all the hooks in the component. For example, useState initializes state, and useEffect sets up any side effects.
3. State Changes: If you change the state (like with setState), it triggers a re-render of the component.
4. Re-render: During this re-render, the UI updates based on the new state.
5. Hooks Re-execution: All hooks are executed again in the same order, reflecting the latest state.
6. Effect Execution: After the re-render, useEffect runs again to handle any side effects.
7. Cycle Continues: This cycle continues: render the UI, execute hooks, change state, re-render, and repeat.

