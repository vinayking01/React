### Hooks Rule
1. Always write hooks inside the component or function at the top of hierarchy.
2. Hooks can only be called at the top level of a component.
3. Hooks cannot be conditional.
4. Component name should be in pascal case.
5. Don't call Hooks inside loops , conditions, or nested functions.

## UseState()  hooks
1. The React useState Hook allows us to track state in a function component.
2.  if you chg the value of state then whole component will re-render.
3. React's useState does not compare the old value with the new value. Instead, when you call the state updater function (like setState), React assumes the state has changed and schedules a re-render of the entire component.
Once this re-render is initiated, React performs a reconciliation process. During reconciliation, React compares the new virtual DOM with the previous one to identify any differences. Only the parts of the DOM that have changed are then updated in the actual DOM, resulting in the final visual updates on the screen.
4. useState hook returns an array with two elements:
- The current state value (which you can read and display).
- A function to update the state (which you use to change the state).

## UseEffect() hooks
1. useEffect is a Hook that allows you to perform side effects in function components. Side effects can include things like fetching data from an API, updating the DOM, or setting up subscriptions.
2. useEffect accepts two arguments. The second argument is optional. useEffect(function, dependency item)
3. In Use Effects Some effects require cleanup to reduce memory leaks. Timeouts, subscriptions, event listeners, and other effects that are no longer needed should be disposed.
4. in React whenever you need to perform side effects in your component. Side effects are actions that happen outside of the React component's pure rendering logic, such as:
    1.1 Fetching Data from an API:
    1.2 When you need to set up a timer or interval.


```
useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
```

## UseContext() Hook
1. useContext hook allows you to pass data down the component tree without having to manually pass props at every level. In your case, you want to use the context in only the 3rd child. Here’s how you can do that . 
- Create a context: Define your context in a parent component.
- Provide context to the children: Use the context provider in the parent only.
- Consume context: Only the 3rd child component will consume the context.
2. It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.
3. The one major need of this hook is if require a props of parent to be used in any deeply nested children then we have to pass it across all the children as props then, we can only able to use it. this  is known as 'prop drilling'. Prop drilling refers to the process of passing data from a parent component down to child components through props, even if some of those intermediate child components don't actually need the data. This happens when you need to pass data from a parent component to a deeply nested child component but all the intermediate components must still pass the prop along the chain.
3. the issue of prop drilling is later resolved by use context feature.
 

## UseRef() hook
1. Accessing the Items of DOM elements.
2. Persisting the Mutable value without re-rendering.

## UseReducer()  Hook
1. The useReducer Hook is similar to the useState Hook.It allows for custom state logic.If you find yourself keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful.

2. useReducer(reducer, initialState)
- useReducer: This is the hook provided by React that allows you to manage state in a function component using a reducer function.
- reducer: This is a function that determines how the state should change based on an action. It takes two arguments: the current state and an action, and returns the new state.
- initialState: This is the initial value of the state. It can be a primitive, an object, or any data structure you need.

3. const [state, dispatch]
- state: This is the current state of your component. It's managed by the useReducer hook and is updated based on the actions dispatched.
- dispatch: This is a function that you use to send actions to the reducer. When you call dispatch with an action, the reducer function runs and returns a new state based on the action and the current state.


## UseLayoutEffect() Hook
1. it run synchronously after a mutation on DOM just before the browser has painted the update layout. it is almost same as UseEffect(), but it runs synchronously whereas useEffect runs asynchronously  .  

## UseMemo()  Hook
1. useMemo ensures that the computation inside it is not unnecessarily repeated on every render
1. it is based on the concept of the Memoization . it is an optimization technique that makes the application more efficient and hence faster. it does by storing the result in cache , and retrieving that same information from the cache.
2. The React useMemo Hook returns a memoized value. Think of memoization as caching a value so that it does not need to be recalculated.
3. useMemo is a hook that memoizes the result of a computation. It returns a memoized value that only changes if one of its dependencies has changed. 
4. We can put here the Expensive calculation function here so that it won't run again and again when the state is also associated in that component.it only renders when the result into it changes. (The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running.)
5. This can improve performance.
4. useMemo() function has two arguments first is function where you contain your logic and it should always return the value, and second argument is dependency array [ value1, value2] it should no empty.



    ### Syntax
    ```
    const marks = useMemo(()=>{
        return (sub1/100);
    },[sub1])
    ```
## React Memo() 
1. it helps to stop the re-rendering of the component if the passed props are same as it is. you needs to wrap the component under memo(). memo should only be used to wrap components, not functions.
2.  is used to optimize React components by preventing unnecessary re-renders when props don't change.

    ### Syntax
    ```
    // Define the Percentage component and memoize it
    const Percentage = memo(({ totalmarks }) => {
    const Per = (totalmarks * 100) / 500;
    console.log("rerendering Percentage component");
    return (
        <>
        <h3>My percentage: {Per}</h3>
        </>
    );
    });


     <Percentage totalmarks={totalmarks} />

    ```


### useCallback()
1. The useCallback hook in React is used to memoize a function. It returns a memoized version of the callback that only changes if one of the dependencies has changed.
2. See in react what happens, Every time the component re-renders, a new instance of the function is created. This means that the reference to the function changes, even if the logic inside the function is the same.
so if we use useCallback it won't create every time the new reference.
3. this allows us to isolate resource intensive functions so that they will not automatically run on every render.
4. In React, if a component receives props that change on every render (like a new function instance), it will re-render even if the logic inside the component remains the same. This happens because JavaScript functions are objects and they have referential equality issues – each new instance of a function is considered different from the previous one. and It is resolved by useCallback because even after using the React Memo it won't stop the rendering of the function.

### custom Hook()
1. In custom hook we create our custom hooks.

### Understanding props.children
- children refer to the content that is passed between the opening and closing tags of a component. This content can be any JSX element, including HTML elements, other React components, strings, or even functions. These children can be accessed in the child component using props.children.
- In React, when you pass JSX or other content between a component’s opening and closing tags, that content becomes the children of that component. 

```
const ParentComponent = () => {
  return (
    <div>
      <ChildComponent>
        <p>This is a child element</p>
        <button>Click Me</button>
      </ChildComponent>
    </div>
  );
};

const ChildComponent = (props) => {
  return (
    <div>
      <h2>Child Component</h2>
      {/* Accessing the children passed into the component */}
      {props.children}
    </div>
  );
};
```



### Question 
1. if you are using constant variable and try to change it , it usually throws the error but when you use const [set, settingset] = useState(32);  and changes the value it won't ? 

```
Solution
 - const is creating a constant reference to an array of two values: set (state value) and settingset (the function to update the state).
- Even though the reference to set and settingset() cannot change, you are not reassigning these variables. You are using settingset to update the state, which is allowed
- the reference to set and settingset remains constant.
```
const p = 23; p = 232; //


2. Batch Updates occur in UseState or useReducer hook only - when you call multiple setState or setCount updates for the same variable within the same event (like a button click), here's what happens:  they all are sent in single batch and job scheduled synchronously but not actual chg in UI.  the re-render happens after the entire function execution that contains the state updates, not in between.
let's take example
```
What will be the output in this ?
<button onClick={() => {
setCount(count + 1); // React sees count as 0, so schedules count = 0 + 1 = 1
setCount(count + 1); // React sees count as 0, so schedules count = 0 + 1 = 1 again
setCount(count + 1); // React sees count as 0, so schedules count = 0 + 1 = 1 again
}}>
  Click Me
</button>
```
> setCount(count + 1): This schedules an update where count is incremented by 1. But since count is still 0 at this moment (React hasn’t updated yet), all the subsequent updates will use the value of count as 0. In react This is because all the updates were batched together, and React used the same initial count value (0) for all of them. After batching, the final count will be 1.
The update will happen only function will completely executes and then changes reflected.
- the solution of this problem is by "Functional Updates (Avoiding Stale State):"
---

" Functional Updates (Avoiding Stale State): "
- If you want to ensure each state update uses the most up-to-date state, you can use functional updates:
```
 const handleClick = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
};
```
> -Here, each call to setCount is given the latest state (prevCount), so the updates happen sequentially. In functional Updates , each function (prevCount => prevCount + 1) operates based on the latest state (which includes previous updates from the same batch).

> When you use the functional update form of setState in React (such as setCount(prevCount => prevCount + 1)), it does not update the stale value; instead, it operates on the latest available state value at the time of processing the queued updates.




