# Components & Props

## Components
1. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
2. In ReactJS, we have mainly two types of components. they are fo two types. - a. Functional Components - Function Components are simpler and more concise than Class Components. They are JavaScript functions that return React elements. in current time function components are majorly used.  (b) Class Components
    ### syntax
    ```
    // App.js
    import React from 'react';
    import CustomComponent from './MyComponent'; // Using a different name (CustomComponent)

    function App() {
    return (
        <div>
        <CustomComponent />
        <p>Welcome to React!</p>
        </div>
    );
    }

    export default App;
    ```
    ### syntax of function component
    ```
    // MyComponent.js
    import React from 'react';

    function MyComponent() {
    return <div>Hello, World!</div>;
    }

    export default MyComponent;
    ```

## Props
1. Props, short for properties, in React are a way to pass data from parent components to child components. They are a fundamental concept in React and play a crucial role in building reusable and dynamic UIs.
2. Props allow you to pass data from a parent component to a child component.
3. Props are read-only and cannot be modified by the child component. They are immutable.

    ### Syntax - App.js ( main)
    ```

    function App() {
    return <Greeting name="John" />;  // Here, name="John" is a prop passed to the Greeting component.
    }
    ```
    ### Syntax - Greeting.js (child)
    ```
    function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
    }
    ```
4. we can also share the validation of the type of the props and also set the default value of props
    ### Syntax for Validation
    ```
    import PropTypes from 'prop-types'; // importing the library

    function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
    }

    Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    };

    ```

    ### Syntax for default values set of Props
    ```
    function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
    }

    Greeting.defaultProps = {
    name: 'Guest',
    };

    ```

## > Passing JSX as Props in component
    We can pass JSX as props in component
    and same wat to access in component eg - props.greetings
    ### syntax
    ```
    UserCard name="Bob" greetings={
      <>
      <p>Hello Bob ! Have wonderful day</p>
      </>
    } />
    ```
## > Passing JSX or simple text in Component body
    yes we can pass the content in the component body also only when it has closing tag also . It can be accessed by Props.children inside the component.

    ### Syntax
    ```
    const App = () => (
    <>
        <UserCard greetings={
            <>
            <p>Hello Bob! Have a wonderful day.</p>
            </>
        } 
        />
        <button>Contacts</button>
    </>
    );

    Component.js

    <h1> Props.children </h1> 
    ```

## Types of CSS in React
 1. Traditional CSS: This includes regular CSS files that you can import into your React components to apply styles.
 2. CSS Modules: A CSS file in which all class and animation names are scoped locally by default, making it easier to manage styles without conflicts.
 3. Styled Components: A popular library for React and React Native that allows you to use component-level styles in your application. It leverages tagged template literals to style your components.
 4. Tailwind CSS: A utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS. It is highly customizable and works seamlessly with React.


## > Inline Styling of CSS in React

1. Inline styles in React are specified using Javascript Objects . Property names are written in camelCase instead of traditional (plain css kabab case).
2. The property name of Object in js doesn't support the hypen(-) in property name, in naming convention of js  so don't use it, because this kind of variable name are incorrect for object in js or js related library or framework . This is the main issue due to which it doesn't support the kabab case convention in styling css of React.


    ### Syntax
    ```
    obj = {
        name :"vinay"
        user-name : "vinay singh"       // it is wrong we can't use (-) in name of property inside the object in js itself. it is simple object logic to understand why camelcase is required in react for css.
    }
    
    "In React"

    const divStyle={backgroundColor : 'blue', fontSize : "20px  "};
    <h1 style = {divStyle}> Hello World</h1>

    ```
##  > Units syntax during the styling of css in react 
1. For most numeric values, you need to specify units as a string ( '16px' ). Some properties like zIndex, can take numeric values directly.

    ### Syntax
    ```
    "App.js"
    
    <h1 style = {{ 
    position: 'absolute',
    top: '100px',
    }}> This is the Heading </h1>
    ```

## > Conditional styling of css in React
1. Applying the conditions during application of css in react.

    ### Syntax
    ```
    style ={
        { backgroundColor : `${colorChange ? "black" : "red"}`}
    }
    
    ```

## CSS Modules 
1. Every time you import  a css file they are regarded as global css.
2. CSS modules helps you to keep styles specific to component they're being used in.
3. Rules - 
    1.1. Name your CSS files with the .module.css extension (e.g., styles.module.css).
    1.2 Access class names as properties of the imported styled object.
    1.3 Combine multiple class names as template literals.

    ## syntax
    ```
      import para from './para.module.css' // importing   
      <p className={`${para.paragraph}  ${para.shadow}`}> - //this way we use the module css
    ```

## Styled Components
1. npm install styled-components
2. You can create styled components by using the styled object provided by the library. Each styled component is essentially a React component with styles applied to it.

    ## Syntax
    ```
    import styled from 'styled-components';

    const Container = styled.div`
    font-size: 24px;
    color : green;
    `;

    ```

# Note  Important - 
1. When you import a regular CSS  file or anything in a component, its styles are applied globally, affecting all matching elements throughout the entire application. This includes from the parent which import to all the elements, sibling, and other components. The only solution of this issue is using "css module(in case of css )" so that it scopes bound only to the component which imported.


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