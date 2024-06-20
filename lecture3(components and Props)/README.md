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
2. 

# Note  Important - 
1. When you import a regular CSS  file or anything in a component, its styles are applied globally, affecting all matching elements throughout the entire application. This includes from the parent which import to all the elements, sibling, and other components. The only solution of this issue is using "css module(in case of css )" so that it scopes bound only to the component which imported.



