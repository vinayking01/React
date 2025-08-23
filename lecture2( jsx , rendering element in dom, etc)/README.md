## Q: Single page Application vs Multi page application.

#### SinglePage Application
1. After making any first req, it bring their html , css, js and whenever different req is made the only few components will reload of the page not full page. because now js have the full control which dynamically chg the data of the page on events or reqs.\
2. saves the bandwidth.

#### MultiPage Application
1. Page reload in every req, because for every  req it will bring their respective html,css,js for every different req. ex - harry/about , harry/contact
2. Bandwidth waste.
 

##  > Understanding JSX
    1. JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX created by facebook.
    2. JSX makes it easier to write and add HTML in React.
    3. JSX converts HTML tags into react elements.
    4. Remember that JSX is not HTML; it gets compiled to JavaScript. Therefore, you can use JavaScript features directly within JSX to create dynamic and interactive UI components in React. JSX allows you to write html like syntax to create look alike react elements easily rather than that complex code.
    5. using jsx we got the functionality of using the expression, function call , conditional statement inside the HTML using jsx only , which we can't use in simple HTML file.
    6. Every expression in jsx should be wrapped inside the curly braces.  The outer pair of curly braces {} is used to denote a JavaScript expression within JSX. This allows you to write JavaScript code inside JSX, such as variables, functions, or object literals.

## Q: Browser only understand js, then how this jsx is working in react.
-  See in case when we use Create-react-app, it uses `babel` package which transpiled the jsx code into => React.createElement => React ElementJS Object => HTML Object(finally rendered in browser)

- In the case of Most Package bundlers for eg - Parcel
Parcel takes the JSX code => Babel => React.createElement => React ElementJs object => HTML Object


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

## Q: What is the difference between `Named export`, `Default export`, and `* as export`?
- A: ES6 provides us to import & export a module and use it in other files. ES6 provides two ways to export a module from a file: `named export` and `default export`.
- In `Named export`, one can have multiple named exports per file. Then import the specific exports they want surrounded in `{}` braces. The name of imported module has to be the same as the name of the exported module.

- In `Named export`, the component is exported from MyComponent.js file like:

``` js
export const MyComponent = () => {}
export const MyComponent2 = () => {}
```

and the component is imported from MyComponent.js file like: here we must use `{}` in MyComponent.

``` js
// ex. importing a single named export
import { MyComponent } from "./MyComponent";

// ex. importing multiple named exports
import { MyComponent, MyComponent2 } from "./MyComponent";

// ex. giving a named import a different name by using "as":
import { MyComponent2 as MyNewComponent } from "./MyComponent";
```

- In `Default export`, One can have only one default export per file. The naming of import is completely independent in default export and we can use any name we like.
In `Default export`, the component is exported from MyComponent.js file like:

``` js
const MyComponent = () => {}
export default MyComponent;
```

and the component is imported from MyComponent.js file like: here we must omit `{}` in MyComponent.

``` js
import MyComponent from "./MyComponent";
```

- In `* as export`, it is used to import the whole module as a component and access the components inside the module.
- In `* as export`, the component is exported from MyComponent.js file like:

``` js
export const MyComponent = () => {}
export const MyComponent2 = () => {}
export const MyComponent3 = () => {}
```

and the component is imported from MyComponent.js file like:

``` js
import * as MainComponents from "./MyComponent";
```

Now we can use them in JSX as:

``` js
<MainComponents.MyComponent />
<MainComponents.MyComponent2 />
<MainComponents.MyComponent3 />
```

We can use `Named export` and `Default export` together. So you should export like:

``` js
export const MyComponent2 = () => {}
const MyComponent = () => {}
export default MyComponent;
```

and import like:

``` js
import MyComponent, {MyComponent2} from "./MyComponent";
```

- Default & Named export import - whenever you export both named and default , it should be import in their manner.


## Q: Looping in React jsx
    We don't have for loops in JSX , so we have to use .map() methods for any kind of looping.
    React.js will complain if oyu don't pass key prop. The key attribute should be a unique identifier for each element in the list. This is often an ID from your data, or the index of the item if no unique identifier is available. It won't use it will result in inefficient rendering and state issues. 

    In React, you can use the map function directly inside JSX without storing its result in a variable. React handles the rendering of the elements returned by map using return statement.
    ### Syntax 
    ``` js 
    <ul>
      {
        f.map((currElem,index)=>{
         return  (<li key={index}>{currElem}</li>) 
        })
      }
    </ul>
    ```

## Q: Why do we need `keys` in React?

A: A `key` is a special attribute you need to include when creating lists of elements in React. Keys are used in React to identify which items in the list are changed, updated, or deleted. In other words, we can say that keys are unique Identifier used to give an identity to the elements in the lists.
Keys should be given to the elements within the array to give the elements a stable identity.

#### Example

``` js
<li key={0}>1</li>
<li key={1}>2</li>
<li key={2}>3</li>
```

## Q: Can we use `index as keys` in React?

A: Yes, we can use the `index as keys`, but it is not considered as a good practice to use them because if the order of items may change. This can negatively impact performance and may cause issues with component state.
Keys are taken from each object which is being rendered. There might be a possibility that if we modify the incoming data react may render them in unusual order.  so its better to use uuid or unique id.

## Q: Short-circuit Evaluation In ReactJs
    ``` js
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

## Q: Imp Key Differences of JSX vs JS
- Use className instead of class for specifying CSS classes in JSX.
- The tags like 'hr' in js was not required the closure tag but in JSX every these kind of tags require closure like ' hr /'
- Remember to use camelCase for certain attributes like tabIndex and ariaLabel.
- Utilize curly braces {} for embedding JavaScript expressions, logic, and variables within JSX.
- Apply inline styles using JavaScript objects within the style attribute, using camelCase for CSS properties. 

## Q: Does the file extension (.jsx, .js, etc.) matter in React?
Not much. React can work with .js, .jsx, or other JavaScript extensions — it’s mainly about developer preference and code clarity. Yeah, but i think soma package bundlers have their inbuilt configurations so they prefer there extension. So it's hardly matters.

## Q:  Since JSX allows us to place any JavaScript expression inside {}, couldn’t this be used to leak data or perform the cross side scripting or allow an attacker to inject malicious code {}?
When you insert values inside {} in JSX, React automatically escapes them to prevent malicious code execution. This means even though you can execute JavaScript expressions, React sanitizes the output so attackers can’t inject harmful scripts.

## Q: What is Optional Chaining in JavaScript?
Optional chaining (?.) allows you to safely access nested object properties without throwing an error if a property is null or undefined.

```js
const userName = user?.profile?.name;

```
