### Hooks Rule
1. Always write hooks inside the component or function at the top of hierarchy.
2. Hooks can only be called at the top level of a component.
3. Hooks cannot be conditional.
4. Component name should be in pascal case.
5. Don't call Hooks inside loops , conditions, or nested functions.

## UseState()  hooks
1. The React useState Hook allows us to track state in a function component.
2.  if you chg the value of state then whole component will re-render.

## UseEffect() hooks
1. useEffect accepts two arguments. The second argument is optional. useEffect(<function>, <dependency>)
2. In Use Effects Some effects require cleanup to reduce memory leaks. Timeouts, subscriptions, event listeners, and other effects that are no longer needed should be disposed.

## UseContext() Hook
1.It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.
2. The one major need of this hook is if require a props of parent to be used in any nested children then we have to pass it across all the children as props then, we can only able to use it. this  is known as 'prop drilling'
which is later resolved by use context feature.
3. 

## UseRef() hook
1. Accessing the Items of DOM elements.
2. Persisting the Mutable value without re-rendering.

## UseReducer()  Hook
1. useReducer(reducer, initialState)
- useReducer: This is the hook provided by React that allows you to manage state in a function component using a reducer function.
- reducer: This is a function that determines how the state should change based on an action. It takes two arguments: the current state and an action, and returns the new state.
- initialState: This is the initial value of the state. It can be a primitive, an object, or any data structure you need.
2. const [state, dispatch]
- state: This is the current state of your component. It's managed by the useReducer hook and is updated based on the actions dispatched.
- dispatch: This is a function that you use to send actions to the reducer. When you call dispatch with an action, the reducer function runs and returns a new state based on the action and the current state.


## UseLayoutEffect() Hook
1. it run synchronously after a mutation on DOM just before the browser has painted the update layout. it is almost same as UseEffect(), but it runs synchronously whereas useEffect runs asynchronously  .  

## UseMemo()  Hook
1. it is based on the concept of the Memoization . it is an optimization technique that makes the application more efficient and hence faster. it does by storing the result in cache , and retrieving that same information from the cache.
2. The React useMemo Hook returns a memoized value. Think of memoization as caching a value so that it does not need to be recalculated.
3. useMemo is a hook that memoizes the result of a computation. It returns a memoized value that only changes if one of its dependencies has changed. 
4. We can put here the Expensive calculation function here so that it won't run again and again when the state is also associated in that component.it only renders when the result into it changes. (The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running.)
5. This can improve performance.
4. useMemo() function has two arguments first is function where you contain your logic and it should always return the value, and second argument is dependency array [ value1, value2] it should no empty.
5. It stops the rendering again if the value from the previous value doesn't change.


    ### Syntax
    ```
    const marks = useMemo(()=>{
        return (sub1/100);
    },[sub1])
    ```
## React Memo() 
1. it helps to stop the re-rendering of the component if the passed props are same as it is. you needs to wrap the component function under memo()

    ### Syntax
    ```
    import React, { memo } from 'react';

    export default memo(function Percentage({ totalmarks }) {
    }

    ```


### useCallback()
1. The React useCallback Hook returns a memoized callback function.
2. his allows us to isolate resource intensive functions so that they will not automatically run on every render.
3. The useCallback Hook only runs when one of its dependencies update.
4. In React, if a component receives props that change on every render (like a new function instance), it will re-render even if the logic inside the component remains the same. This happens because JavaScript functions are objects and they have referential equality issues – each new instance of a function is considered different from the previous one. and It is resolved by useCallback because even after using the React Memo it won't stop the rendering of the function.

### custom Hook()
1. In custom hook we create our custom hooks.
