##  >single page Application vs multi page application.

#### Singlepage Application
1. after making any first req, it bring their html , css, js and whenever different req is made the only few components will reload of the page not full page. because now js have the full control which dynamically chg the data of the page on events or reqs.\
2. saves the bandwidth.

#### Multipage Application
1. page reload in every req, because for every  req it will bring their respective html,css,js for every different req. ex - harry/about , harry/contact
2. Bandwidth waste.

 

##  > Understanding JSX

    1. JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code directly in your JavaScript files. It's commonly used in React to define the structure of UI components.
    2. Remember that JSX is not HTML; it gets compiled to JavaScript. Therefore, you can use JavaScript features directly within JSX to create dynamic and interactive UI components in React.
    3. using jsx we got the functionality of using the expression, function call , conditional statement inside the HTML using jsx only , which we can't use in simple HTML file.
    4. Every expression in jsx should be wrapped inside the curly braces.  The outer pair of curly braces {} is used to denote a JavaScript expression within JSX. This allows you to write JavaScript code inside JSX, such as variables, functions, or object literals.

2. ### Creating a Simple Component
    Open src/App.js (one of the component) in your project directory.
        ```
        import React from 'react';

        function App() {
        return (            // this is our jsx
            <div>
            <h1>Hello, JSX!</h1>
            <p>This is a simple JSX example in React.</p>
            </div>
        );
        }

        export default App;
        ```

3. ### Embedding JavaScript Expressions in jsx

    ```
        function App() {
    const name = 'John Doe';
    return (
        <div>
        <h1>Hello, {name}!</h1>
        <p>This is a simple JSX example in React.</p>
        </div>
    );
    }
    
    ```
4. ### Fragments in jsx-
    JSX Fragments (<>...</>) allow you to return multiple elements without wrapping them in a single parent element: because components in react are only able to return single element. 

        ```
                function App() {
            return (
                <>
                <h1>Hello, JSX!</h1>
                <p>This is a JSX fragment example.</p>
                </>
            );
            }
        ```

5. ### Import & Export in React
    A. 
    Default Export - A file can have only one default export.
    Default Import - When importing that default export you can use any name.

    ### Syntax
    ```
    export default NetflixSeries;
    import Series from '/AppComponent/NetflixSeries' or import NetflixSeries from '/AppComponent/NetflixSeries'
    ```
    B. Named Export - Name should be of same name of component you are exporting . one more advantage is it Can have multiple named export .
    ### Syntax
    ```
    "Home.js"
    export const NetflixSeries;
    export const Footer;

    "App.js"
    import {NetflixSeries, Footer} from '/AppComponent/NetflixSeries' 
    ```

    C. Default & Named export import - whenever you export both named and default , it should be import in their manner.

6. ### Looping in React jsx
    We don't have for loops in JSX , so we have to use .map() methods for any kind of looping.
    React.js will complain if oyu don't pass key prop. The key attribute should be a unique identifier for each element in the list. This is often an ID from your data, or the index of the item if no unique identifier is available. It won't use it will result in inefficient rendering and state issues. 

    In React, you can use the map function directly inside JSX without storing its result in a variable. React handles the rendering of the elements returned by map using return statement.
    ### Syntax 
    ```
    <ul>
      {
        f.map((currElem,index)=>{
         return  (<li key={index}>{currElem}</li>) 
        })
      }
    </ul>
    ```
7. ### Short-circuit Evaluation In ReactJs
    ```
    short-circuit evaluation refers to a behavior where logical expressions are evaluated from left to right, and the evaluation stops as soon as the result is determined without needing to evaluate the entire expression.

    Short-circuit evaluation in JSX refers to a pattern used to conditionally render elements based on a logical expression, primarily using the && (AND) or || (OR) operators.
    
    How It Works:
    
    - && (Logical AND): If the condition on the left side evaluates to true, the right side will be rendered. and if left is false , the left will be returned.

    example  - 
    console.log(true && "Continue");  // Output: "Continue" (left side is true, so right side is returned)
    console.log(false && "Continue"); // Output: false (left side is false, so right side is ignored)


    - || (Logical OR): If the condition on the left side evaluates to false, the right side will be rendered. if left side is true, then left will be returned. 

    example-
    console.log(true || "Fallback");   // Output: true (left side is true, so right side is ignored)
    console.log(false || "Fallback");  // Output: "Fallback" (left side is false, so right side is used)
    
    This pattern is useful for conditional rendering without needing a full if statement or ternary operator.

    ```

## Imp Key Differences of JSX vs JS
- Use className instead of class for specifying CSS classes in JSX.
- the tags like <hr> in js was not required the closure tag but in JSX every these kind of tags require closure like <hr />
- Remember to use camelCase for certain attributes like tabIndex and ariaLabel.
- Utilize curly braces {} for embedding JavaScript expressions, logic, and variables within JSX.
- Apply inline styles using JavaScript objects within the style attribute, using camelCase for CSS properties. 

## Rendering the Element in DOM

1. Let’s say there is a <div> somewhere in your HTML file:  <div id="root"></div>  - everything inside it will be managed by DOM.
2. To render a React element, first pass the DOM element to ReactDOM.createRoot(), then pass the React element to root.render():

```
    const root = ReactDOM.createRoot(
    document.getElementById('root')
    );
    const element = <h1>Hello, world</h1>;
    root.render(element);
```

## updating the rendered element in the DOM
1. React elements are immutable. Once you create an element, you can’t change its children or attributes. 
2. In React, changing the properties of elements is typically done through state and props rather than directly modifying the elements themselves. which is only dynamically.( We will see in next lectures the PROPS and State)

## React Rendering
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