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
    ``` js 
    import PropTypes from 'prop-types'; // importing the library

    function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
    }

    Greeting.propTypes = {
    name: PropTypes.string.isRequired,
    };

    ```

    ### Syntax for default values set of Props
    ```js script
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

    ```js script
    < UserCard name="Bob" greetings={
      <>
      <p>Hello Bob ! Have wonderful day</p>
      </>
    } />

    ```
## > Additional feature "Understanding props.children" - Passing JSX or simple content in Component body not as props instead in between enclosing tag
   This concept of passing jsx or other content (This content can be any JSX element, including HTML elements, other React components, strings, or even functions. ) in react in between enclosing tags ( component function body)
    After passing in child component we can access it with " props.children ".
   - What are children?
   In React, children refers specifically to the content that you place between the opening and closing tags of component

    ### Syntax
    ``` js 
    parent.jsx

    const ParentComponent = () => {
    return (
        <div>
        <ChildComponent name="John">
            <p>This is a child element</p>
            <button>Click Me</button>
        </ChildComponent>
        </div>
    );
    };

    - child.jsx

    const ChildComponent = (props) => {
    return (
        <div>
        <h2>Child Component {props.name}</h2>
        {/* Accessing the children passed into the component */}
        {props.children}
        </div>
    );

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
    ``` jsx
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
    ``` jsx
    "App.js"
    
    <h1 style = {{ 
    position: 'absolute',
    top: '100px',
    }}> This is the Heading </h1>
    ```

## > Conditional styling of css in React
1. Applying the conditions during application of css in react.

    ### Syntax
    ``` js
    style ={
        { backgroundColor : `${colorChange ? "black" : "red"}`}
    }
    
    ```

## CSS Modules 
1. Every time you import  a css file they are regarded as global css (which is limitation of using regular css in React).CSS modules helps you to keep styles specific to component they're being used in.
2. CSS modules allow you to scope your styles locally to the component, preventing them from affecting other components.
3. Rules - 
    1.1. Name your CSS files with the .module.css extension (e.g., styles1.module.css).
    1.2 Access class names as properties of the imported styled object.
    1.3 Combine multiple class names as template literals.

    ## syntax
    ``` js
    /* File: ChildComponent.module.css */
    .paragraph {
    color: blue;
    font-size: 18px;
    }


    /* File: ParentComponent.jsx */
    import React from 'react';
    import styles from './ChildComponent.module.css'; // Import the CSS module

    const latin_para = () => {
    return <p className={styles.paragraph}>This is a paragraph in the child component.</p>;
    };

    ```
CSS Modules are a way to scope CSS in React applications to avoid global style conflicts. Unlike traditional CSS files, CSS Modules generate unique class names, ensuring styles are only applied to the components where they are imported.

### **🔹 Example of CSS Modules**

#### **styles.module.css**
```css
/* styles.module.css */
.title {
  color: red;
  font-size: 24px;
}
```

#### **Using CSS Modules in a React Component**
```jsx
import React from "react";
import styles from "./styles.module.css";

const App = () => {
  return <h1 className={styles.title}>Hello, CSS Modules!</h1>;
};

export default App;
```

✅ **Benefit**: The class name in the final HTML will be unique, preventing conflicts.

---
## **3️⃣ Issues with CSS Modules**
While CSS Modules scope **class-based styles** to a component, **IDs (`#id`) and tag selectors (`h1`, `p`, etc.) remain global**. This can lead to unintended styling issues.

### **🔴 Issue: Global Scope for IDs and Tags**
- If you use an ID selector (`#title`) or a tag selector (`h1 {}`) inside a CSS Module, it will still apply globally.
- This can unintentionally style other components.

✅ **Solution**:
- Avoid using ID selectors (`#id`) in CSS Modules.
- Prefer class-based styling since CSS Modules scope class names automatically.

#### **Incorrect (Global Effect)**
```css
/* styles.module.css */
h1 {
  color: red; /* Affects all <h1> tags globally because this is treated as global then not even required to write and this line will act as soon as u just import this css file */ 
}
```
#### **Correct (Scoped Effect)**
```css
/* styles.module.css */
.title {
  color: red; /* Affects only elements using this class */
}
```

---

### **4️⃣ Styled Components (Best for Dynamic Styling)**
Styled Components use **CSS-in-JS**, allowing you to write styles directly inside your components.

✅ **Pros**:
- Scoped by default (No global leakage)
- Supports dynamic styling with props
- No class name conflicts

❌ **Cons**:
- Requires installing an extra library
- Styles are inside JavaScript (not separate CSS files)

#### **Install Styled Components**
```sh
npm install styled-components
```

#### **Example: Styled Components in React**
```jsx
import React from "react";
import styled from "styled-components";

// Styled Component
const Title = styled.h1`
  color: ${(props) => (props.primary ? "blue" : "red")};
  font-size: 24px;
`;

const App = () => {
  return <Title primary>Hello, Styled Components!</Title>;
};

export default App;
```

✅ **Benefit**: The color changes dynamically based on the `primary` prop.

---
### **5️⃣ Tailwind CSS (Best for Utility-First Styling)**
Tailwind is a **utility-first CSS framework** where you apply styles directly in class names.

✅ **Pros**:
- No need to write custom CSS files
- Highly optimized and reusable
- Works great for responsive designs

❌ **Cons**:
- Can be harder to read due to many class names
- Requires learning Tailwind syntax

#### **Install Tailwind CSS**
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### **Usage in a React Component**
```jsx
const App = () => {
  return <h1 className="text-red-500 text-2xl">Hello, Tailwind CSS!</h1>;
};

export default App;
```

✅ **Benefit**: Super fast styling with pre-built utility classes.

---
## **🏆 Which One Should You Use?**
| Feature             | CSS Modules  | Styled Components | Tailwind CSS |
|---------------------|-------------|-------------------|-------------|
| **Scoped Styles**   | ✅ Yes      | ✅ Yes            | ✅ Yes (via utility classes) |
| **Global Styles**   | ❌ No       | ❌ No             | ✅ Yes      |
| **Dynamic Styling** | ❌ No       | ✅ Yes (Props)    | ❌ No      |
| **Performance**     | ⚡ Fast     | 🐢 Slower (Runtime) | ⚡ Fast   |
| **Setup Difficulty** | Easy        | Medium            | Medium     |
| **Best for Beginners?** | ✅ Yes | ✅ Yes (but learn JS) | ✅ Yes |

---
## **🚀 Final Recommendation**
- **Use CSS Modules** if you want **simple, scoped styles** without extra libraries.
- **Use Styled Components** if you need **dynamic styles and a clean syntax**.
- **Use Tailwind CSS** if you like **utility-first styling with no custom CSS files**.


# Note  Important - 
1. When you import a regular CSS (like styles.css) file or anything in a component (App.jsx), those styles are added to the global scope of your application. This means they are available to all components within that application. those styles which you imported are applied to all the parents, elements, sibling, and other components. 
2. To resolve the issue of global styles affecting unwanted elements in your react application you should use "css modules"

