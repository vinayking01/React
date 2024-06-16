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