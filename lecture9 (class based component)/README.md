
# Class Based Component

## What is a Class Component in React?
- A class component is created by extending the React.Component class provided by React.
- React.Component gives you: Props handling , State management, Lifecycle methods, render() method.
- This statement creates an inheritance to React.Component, and gives your component access to React.Component's functions.
- Before React 16.8, class components were the only way to use state and lifecycle methods because Hooks didn’t exist.
- The component also requires a render() method, this method returns HTML.
- On Mount phase (first time the component appears on the screen):React creates a new object instance from your component’s class.
- Re-render phase (due to state/props changes): React does NOT create a new instance.
It reuses the same object from the first mount.

``` js

  class MyComponent extends React.Component {
    render() {
      return <h1>Hello World</h1>;
    }
  }

```

## Constructor in class based component
- If there is a constructor() function in your component, this function will be called when the component gets initiated.
-The constructor function is where you initiate the component's properties.
- In React, component properties should be kept in an object called state. 
- If your class has a constructor, you must call super() before accessing this.
- including the super() statement, which executes the parent component's constructor function, and your component has access to all the functions of the parent component (React.Component).

```js

class Car extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}
```

## Passing Props in class 
- Props are read-only inputs passed from a parent to a child component.
- Props are not limited to the constructor — you can use this.props in render() or other methods without having a constructor.
- If your component has a constructor function, the props should always be passed to the constructor and also to the React.Component via the super() method.
```js
<Welcome name="John" age={25} />
```
- 
``` js
// Accessing Props in Class Components

this.props.name
```
- Constructor is only needed if:
  - You want to initialize state using props.
  - You need some logic to run before the first render.

## Q: Why super(props) instead of just super()? which one is correct during passing the props.
- Quick rule:
  - If you need this.props in your constructor → use super(props).
  - If you don’t need it there (e.g., you only use props in render) → super() alone is fine.


## State Handling in Class-Based Components
- React Class components have a built-in state object.
- Constructor is the only right place to create state variable. We can have multiple states inside the single State Object.
- Under the hood same in functional component the state variables are stored int the Object
- The state object is where you store property values that belongs to the component.
- When the state object changes, the component re-renders. 
- Note: The property name state is reserved in class components — don’t use it for other purposes.

```js
  class Car extends React.Component {
    constructor(props) {
      super(props);
    this.state = {brand: "Ford"};
    }
    render() {
      return (
        <div>
          <h1>My Car</h1>
        </div>
      );
    }
}
```

- Can hold multiple keys/values:

```js

this.state = {
  count: 0,
  name: 'React',
  isLoggedIn: true
}

```

## Changing the state Object

- To change a value in the state object, use the this.setState() method.
- When a value in the state object changes, the component will re-render, meaning that the output will change according to the new value(s).
- Merges new state into existing state (does not replace the whole object).

```jsx
// Never modify state directly:


this.state.count = 5; // ❌ no re-render
```

```jsx
this.setState({ count: this.state.count + 1 }); // ✅ merges & re-renders

```

## Class component Lifecycle Methods
- Each component in React has a lifecycle which you can monitor and manipulate during its three main phases.
- The three phases are: Mounting, Updating, and Unmounting.
- Many methods are like deprecated to make it easy after react version 16.4
- Check Online the image of React Lifecycle. 

### (A) Mounting
- Mounting means putting elements into the DOM.
- React has four built-in methods that gets called, in this order, when mounting a component:

1. constructor() 
  - Creates instance, sets initial state & props.
  - The constructor() method is called before anything else, when the component is initiated, and it is the natural place to set up the initial state and other initial values.
2. render() - 
  - Returns JSX for Virtual DOM
  - The render() method is required, and is the method that actually outputs the HTML to the DOM.
3. reactUpdateDom() /commit 
  - React updates the real DOM whatever changes has been finalized in virtual DOM.
4. componentDidMount() 
  - Runs after the component is inserted in the DOM at the last. 
  - Called only once after first render.
  - Use cases: API calls, DOM manipulations, Event subscriptions

  ```js
    componentDidMount() {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => this.setState({ items: data }));
  }

  ```
  - Why here?
    - Good UX: First render → Load → Fetch → Re-render with updated data.
    - Prevents blocking UI with API delays.

### (B) Updating Phase
- Occurs on state or props changes. These methods control whether and how the component updates

1. New Props() , State () & Force Update()

2. render()
  - Same as mounting phase.

3. reactUpdateDom() /commit 
  - React updates the real DOM whatever changes has been finalized in virtual DOM.

4. ComponentDidUpdate(prevProps, prevState, snapshot)
  - Called immediately after update occurs. Good for reacting to prop or state changes (e.g., fetching new data based on prop change).

  ```js
  See how hard it was to update the props or any set in so many if else condition like this if we compare with useEffect()

    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }

  ```

### (C) Unmounting Phase
1. componentWillUnmount()
  - Called just before the component is removed from the DOM. Used to clean up timers, cancel network requests, remove event listeners, or any necessary teardown to prevent memory leaks.
  - Imagine you created a timer using setInterval in your component when it rendered, and that timer triggers some action periodically. If you navigate away from the component page but do not stop the timer, it will keep running in the background unnecessarily, leading to:Memory leaks


```js 
// Functional Component

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup on unmount
      console.log('Timer stopped');
    };
  }, []);


```

```js 
// Class based Component - 

class Timer extends React.Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Clean up the timer
    console.log('Timer stopped');
  }

```


## Q: What is the Batching Behavior and concept in Component lifecycle during the Multiple children.
When parent has multiple children:
- React batches render calls for performance.
- Then batches Commit() calls for all children.
- This means it doesn’t mount and call componentDidMount() child-by-child sequentially just after render.
- Below example will help you to understand the update is done in functional component and Class component both are in batches in case of multiple child including parent.


:---------------------------------------------------------------------------------------:
Functional component

``` js

// Parent.js

import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

function Parent() {

  console.log("outside Parent");

  useEffect(() => {
    console.log("inside Parent useEffect");
  }, []);

  return (
    <div>
      <Child1 />
      <Child2 />
    </div>
  );
}

export default Parent;

// Child1.js
import React, { useEffect } from "react";

function Child1() {
  console.log("outside Child 1");
  useEffect(() => {
    console.log("inside Child 1 useEffect");
  }, []);
  return <div>Child 1</div>;
}

export default Child2;

// Child2.js
import React, { useEffect } from "react";

function Child2() {
  console.log("outside Child 2");
  useEffect(() => {
    console.log("inside Child 2 useEffect");
  }, []);
  return <div>Child 2</div>;
}

export default Child2;

// Output 
Outside parent 
outside Child 1
outside Child 2
inside Child 1 useEffect
inside Child 2 useEffect
Inside parent useEffect

`Explanation`

1. All outside logs from parent and children run first, in tree order (Parent, Child1, Child2):

outside Parent
outside Child 1
outside Child 2


2. After the DOM updates (commit phase), React runs all useEffect hooks also in tree order, meaning:
inside Child 1 useEffect
inside Child 2 useEffect
inside Parent useEffect

```
:---------------------------------------------------------------------------------------:
Class Based component

```js
0
// Parent 
import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

class Parent extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor Parent");
  }

  componentDidMount() {
    console.log("componentDidMount Parent");
  }

  render() {
    console.log("render Parent");
    return (
      <div>
        <Child1 />
        <Child2 />
        <Child3 />
      </div>
    );
  }
}

export default Parent;


// Child1
import React from "react";

class Child1 extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor Child 1");
  }

  componentDidMount() {
    console.log("componentDidMount Child 1");
  }

  render() {
    console.log("render Child 1");
    return <div>Child 1</div>;
  }
}

export default Child1;

// Child2
import React from "react";

class Child2 extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor Child 2");
  }

  componentDidMount() {
    console.log("componentDidMount Child 2");
  }

  render() {
    console.log("render Child 2");
    return <div>Child 2</div>;
  }
}

export default Child2;

//Output 
constructor Parent
render Parent
constructor Child 1
render Child 1
constructor Child 2
render Child 2
componentDidMount Child 1
componentDidMount Child 2
componentDidMount Parent


```
- When app loads:
    1. Initialization and render:
    - constructor Parent
    - render Parent
    - constructor Child 1
    - render Child 1
    - constructor Child 2
    - render Child 2

    2.  DOM is updated in one commit (batch).

    3. Post-commit (side-effect phase): If both parent and child have componentDidMount(): Child’s runs before Parent’s. Because React waits for all children to mount before calling the parent’s mount method.
    - componentDidMount Child 1
    - componentDidMount Child 2
    - componentDidMount Parent


For better understanding look at - w3schools and for Diagram flow  - https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/  .
[https://www.w3schools.com/react/react_lifecycle.asp]("Lifecycle of React by W3Schools")