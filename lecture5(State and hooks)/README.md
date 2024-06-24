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
    ## (B) Use State() Function 
    It actually return an array of two items, current state value and a function to update that value.
    
## Note How rendering works?
1. Initial Renders - when the app component first renders, React renders the Parent , sibling and all child components.
2. State Change in parent Component - React will render Parent component and all child component except the sibling component. (koi bhi parent copmponent ke andar ki state chg krte hai toh pura copmonent with child component dubara new state ke sath re - render hoga .)

# * Derived State in react
Derived State is any state that can be computed based on other state or props. It is not necessarily required the the result of computation in state but it is calculated when needed. 
If the data you are storing is the type of array or object then you can use all the basic computation methods as available in js this is the concept of Derived state from the state in React.

ex - const userCount = user.length ;
