## Q: What is `Config Driven UI`?

A: `Config Driven UI` are based on the configurations of the data application receives. It is rather a good practice to use config driven UIs to make application for dynamic.
It is a very common & basic approach to interact with the User. It provides a generic interface to develop things which help your project scale well. It saves a lot of development time and effort.
A typical login form, common in most of the Apps. Most of these forms also get frequent updates as the requirements increase in terms of Form Validations, dropdown options,.. or design changes.

# * State in React JS
1. In react, State refers to an object that holds data or information about the component . State is managed within the component ( just like variable declared ina a function ). however , unlike regular variables , when state changes , Rect re-enders the component to reflect these changes , Keeping the user interface in sync with the data.
2. Benefit of using it is if we have used that value in many places it will change automatically everywhere when value is changed at single place.
2. State is dynamic and mutable , meaning it can change over the time in response to user action , server responses or other.

    ### Syntax
    ``` js
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
    In React version 16.8, React introduced a new pattern called Hooks. React Hooks are simple JavaScript functions that we can use to isolate the reusable part from a functional component. Hooks can be stateful and can manage side-effects.
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

## Q: What is `Reconciliation` in React?

- `Reconciliation` is the process through which React updates the Browser DOM and makes React work faster. React use a `diffing algorithm` so that component updates are predictable and faster. React would first calculate the difference between the real DOM and the copy of DOM (Virtual DOM) when there's an update of components.
- React stores a copy of Browser DOM which is called `Virtual DOM`. When we make changes or add data, React creates a new Virtual DOM and compares it with the previous one (old virtual DOM). Comparison is done by `Diffing Algorithm`.
- Based on the diff, React calculates the minimal set of changes needed and efficiently updates only those parts of the real DOM that have changed, instead of re-rendering the entire DOM. This process is called Reconciliation. Commit phase: Finally, React applies these specific changes to the real DOM in the browser.

                                 (or)

- Reconciliation is the process by which React updates the UI to reflect changes in the component state. The reconciliation algorithm is the set of rules that React uses to determine how to update the UI in the most efficient way possible. React uses a virtual DOM (Document Object Model) to update the UI.

## Q: What is `React Fiber`?

- React Fiber is a concept of ReactJS that is used to render a system faster, smoother and smarter.
- The Fiber reconciler, which became the default reconciler for React 16 and above, is a complete rewrite of React’s reconciliation algorithm to solve some long-standing issues in React.
Because Fiber is asynchronous, React can:
  - Pause, resume, and restart rendering work on components as new updates come in
  - Reuse previously completed work and even abort it if not needed
  - Split work into chunks and prioritize tasks based on importance

## Q: Difference between `Virtual DOM` and `Real DOM`?

A: DOM stands for `Document Object Model`, which represents your application UI and whenever the changes are made in the application, this DOM gets updated and the user is able to visualize the changes. DOM is an interface that allows scripts to update the content, style, and structure of the document.

- `Virtual DOM`
  - The Virtual DOM is a light-weight abstraction of the DOM. You can think of it as a copy of the DOM, that can be updated without affecting the actual DOM. It has all the same properties as the real DOM object, but doesn’t have the ability to write to the screen like the real DOM.
  - Virtual DOM is just like a blueprint of a machine, can do the changes in the blueprint but those changes will not directly apply to the machine.
  - Reconciliation is a process to compare and keep in sync the two files (Real and Virtual DOM). Diffing algorithm is a technique of reconciliation which is used by React.
- `Real DOM`
  - The DOM represents the web page often called a document with a logical tree and each branch of the tree ends in a node and each node contains object programmers can modify the content of the document using a scripting language like javascript and the changes and updates to the dom are fast because of its tree-like structure but after changes, the updated element and its children have to be re-rendered to update the application UI so the re-rendering of the UI which make the dom slow all the UI components you need to be rendered for every dom update so real dom would render the entire list and not only those item that receives the update .

| `Real DOM`                                                       | `Virtual DOM`                                            |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| DOM manipulation is very expensive                               | DOM manipulation is very easy                            |
| There is too much memory wastage                                 | No memory wastage                                        |
| It updates Slow                                                  | It updates fast                                          |
| It can directly update HTML                                      | It can’t update HTML directly                            |
| Creates a new DOM if the element updates.                        | Update the JSX if the element update                     |
| It allows us to directly target any specific node (HTML element) | It can produce about 200,000 Virtual DOM Nodes / Second. |
| It represents the UI of your application                         | It is only a virtual representation of the DOM           |

## Q: Updating the rendered element in the DOM
1. React elements are immutable. Once you create an element, you can’t change its children or attributes. 
2. In React, changing the properties of elements is typically done through state and props rather than directly modifying the elements themselves. which is only dynamically.( We will see in next lectures the PROPS and State)

## Q: React Rendering
it actually has 3 thing virtual dom, Reconciliation, diff algorithm for differentiation between virtual and actual dom.
(A)Trigger (State/Props Change)
(B)(Create New Virtual DOM)
(C)Reconciliation (Diff Virtual DOMs) - The process of comparing the new virtual DOM with the previous virtual DOM to determine what has changed.
(D)Re-render Update (Apply Changes to Real DOM) - after that function called again return jsx as based on update Dom, and new paint(rendering) done in browser page

When a component is re-rendered in React, it follows a similar process as the initial rendering:

1. The component’s render method is called again, which returns a new JSX representation of the component’s output.
2. React converts the new JSX into a new React element.
3. React then creates a new virtual representation of the component’s output.
4. React compares the new virtual representation with the previous virtual representation to determine the minimum number of changes required to update the actual DOM.
5. React updates the necessary parts of the actual DOM based on the changes identified in the previous step.

## * Important Interview Question

### Question1  - What will be the output in this case ?
```
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1); // First update
  setCount(count + 1); // Second update, still using the original count value
  setCount(count + 1); // Third update, still using the original count value
};

output - it will render the count value as 1 only,and only renders single time on the page.
```
Isn't it is interesting why it happened ?
In React, when you call multiple setState or setCount updates for the same variable within the same event (like a button click), here's what happens:
1. Batching:
React batches these multiple state updates together to optimize performance, instead of applying each one immediately. These updates are scheduled but not yet applied to the component's state or re-rendered on the screen.
2. Single Re-render 
React does not re-render the component after each setState call. Instead, it waits until all the updates in that event handler are complete and then performs one re-render with the final state value.
3. Using Stale state
Since React hasn't actually applied the updates yet, all setState calls reference the original value when the event started.
4. Final State update
The last scheduled update (the last setState call) will determine the final value of the state. After batching all the updates, React will take the last state update and apply that to the component, causing a single re-render with the new state.

#### - Overall summary 
A stale value is an outdated state value that does not reflect the current state of the component during updates. In above case of example the SetState passed on batch of queue , it starts processing every update State but stale value reference to the initial value till the component is rendered again with updated value ( multiple setState or setCount updates for the same variable within the same event (like a button click)).
This issue can be resolved with the help of "functional update form"

#### Solution of problem 
When you use the functional update form of setState in React (such as setCount(prevCount => prevCount + 1)), it does not update the stale value; instead, it operates on the latest available state value at the time of processing the queued updates.  Meaning when we use this method it uses the latest value updated during the batch processing not after fully batch processed. 
```
const handleClick = () => {
  setCount(prevCount => prevCount + 1); // This will always use the most recent count
  setCount(prevCount => prevCount + 1); // Uses the updated count from the previous line
  setCount(prevCount => prevCount + 1); // Uses the updated count from the previous line
};

```
1. When you call setCount with a function, you're passing a callback that takes the previous state as an argument (e.g., prevCount).
2. This callback will receive the latest state value whenever React processes that update.
3. Each time React processes the updates, it retrieves the most recent value of the state and passes it to your callback function.
4. at last when all processed , the function completed rendering will happen now with the latest last updated in the value. 

### How CORS works When we make any Api calls.
1. When you make a fetch request in React:
- If the API is same-origin → CORS doesn’t apply.
- If the API is cross-origin → browser adds an Origin header to the request.
2. Browser behavior:
- Simple requests (GET/POST/HEAD without custom headers) → browser sends the request directly to the server, then checks the response headers ( sent by the server) for: Access-Control-Allow-Origin: <your-origin> or *
    - If it is missing or wrong → browser blocks your JS from reading the response.
- Non-simple requests (PUT, DELETE, JSON body, custom headers) → browser sends a preflight OPTIONS request first. If server approves with correct headers → sends the real request

3. The browser enforces CORS after getting the server’s response.
Even if the server sends data, without proper headers(which is sent by server) your JavaScript can’t access it — you’ll get a CORS error in console.

### Ways to Bypass CORS
1. Frontend dev fixes (only for testing):
   1. You can use CORS Proxy website during making requests, which actually makes req on your behalf ( With limited resources) - 
eg -

        ``` js
        ❌ This below code will gives error when make req.
        const res = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5759152&lng=77.35734479999999&collection=83631&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null')

        ✅ To solve use online proxies eg - ` https://proxy.corsfix.com/?` attach before the links. which actually route the req through their server.
        const res = await fetch('https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5759152&lng=77.35734479999999&collection=83631&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null')

        ```

    2. CORS browser extension (which stops the browser from checks/blocking the response) ✅ dev only ❌ not production
    3. Disable browser security flags ✅ dev only
    4. Public CORS proxy ✅ dev only


