
# Episode 04 - Exploring the world

## Q: What is the Separation of Concerns and Single Responsibility Principle in microservices?
In microservices architecture, Separation of Concerns means breaking down the system into smaller services where each one handles a specific responsibility.
The Single Responsibility Principle ensures each service focuses on one specific task or domain. Services then interact with each other only when required for a use case.

## Q: What is `Microservice`?

A: `Microservice` - also known as the microservice architecture - is an architectural and organizational approach to software development where software is composed of small independent services like database, server or a UI of the application, that communicate over well-defined APIs. These services are owned by small, self-contained teams.
Microservices architectures make applications easier to scale and faster to develop, enabling innovation and accelerating time-to-market for new features.
means we are dividing software into small, well-defined modules enables teams to use functions for multiple purposes.

- Benefits of Microservices:
  - Flexible Scaling
  - Easy Deployment
  - Technological Freedom
  - Reusable Code
  - Resilience

## Q: What is `Monolith architecture`?

A: A `Monolith architecture` is a traditional model of a software program, which is built as a unified unit that is self-contained and independent from other applications. A monolithic architecture is a singular, large computing network with one code base that couples all of the business concerns together. To make a change to this sort of application requires updating the entire stack by accessing the code base and building and deploying an updated version of the service-side interface. This makes updates restrictive and time-consuming.
means we are not dividing software into small, well-defined modules, we use every services like, database, server or a UI of the application, in one Application file.

## Q: What is the difference between `Monolith and Microservice`?

A: With `monolithic architectures`, all processes are tightly coupled and run as a single service. This means that if one process of the application experiences a spike in demand, the entire architecture must be scaled. Adding or improving a monolithic application’s features becomes more complex as the code base grows. This complexity limits experimentation and makes it difficult to implement new ideas. Monolithic architectures add risk for application availability because many dependent and tightly coupled processes increase the impact of a single process failure.

With a `microservices architecture`, an application is built as independent components that run each application process as a service. These services communicate via a well-defined interface using lightweight APIs. Services are built for business capabilities and each service performs a single function. Because they are independently run, each service can be updated, deployed, and scaled to meet demand for specific functions of an application.

## Q:  How can you find the API of any website?
Open the browser’s Developer Tools → Network tab, then perform an action on the website. API requests will appear in the network list — you can inspect them to see the API URLs, request methods, and responses.

## Q: What are the two main approaches to rendering data from APIs?
- Fetch first, then render — Wait for the API data, then render the UI.
- Skeleton first, then data — Render a placeholder/skeleton UI immediately, then re-render with actual data when it arrives (better user experience, Mostly used now a days).

## Q: What is `Shimmer UI`?

A: A `Shimmer UI` resembles the page's actual UI, so users will understand how quickly the web or mobile app will load even before the content has shown up. It gives people an idea of what's about to come and what's happening (while UI currently loading) when a page full of content/data takes more than 3 - 5 seconds to load.
Shimmer UI is a great way for loading the applications. Instead of showing a loading circle we can design a shimmer UI for our application that is good for user experience.

## Q: What is the difference between `JS expression and JS statement`?

A: A `JS expression` returns a value that we use in the application. for example:

``` js
1 + 2 // expresses
"foo".toUpperCase() // expresses 'FOO'
console.log(2) // logs '2'
isTrue ? true : false // returns us a true or false value based on isTrue value
```

A `JS statement`, does not return a value. for example:

``` js
let x; // variable declaration
if () { } // if condition
```

If we want to use `JS expression` in JSX, we have to wrap in `{/* expression slot */}` and if we want to use `JS statement` in JSX, we have to wrap in `{(/* statement slot */)}`;

## Q: What is `Conditional Rendering`? explain with a code example.

A: `Conditional rendering` in React works the same way conditions work in `JavaScript`. Use JavaScript operators like `if` or the `conditional operator` to create elements representing the current state, and let React update the UI to match them. for example:

```
// Using Ternary operator as a shorthand way or writing an if-else statement
{isLoggedIn ? (return <UserGreeting />) : (return <GuestGreeting />)};
// Using an if…else Statement
{
  (if (isLoggedIn) {
    return <UserGreeting />;
  }else {
    return <GuestGreeting />;
  })
}
// Using Logical &&
{isLoggedIn && <button>Logout</button>}
```

## Q: What is the use of `const json = await data.json()`; in `getRestaurants()`?

A: The `data` object, returned by the `await fetch()`, is a generic placeholder for multiple data formats.
so we can extract the `JSON object` from a `fetch` response by using `await data.json()`.
`data.json()` is a method on the data object that lets you extract a `JSON object` from the data or response. The method returns a promise because we have used `await` keyword.
so `data.json()` returns a promise resolved to a `JSON object`.

## Q: Why shouldn’t we use anchor tags for routing in React?
Using an `a` tag reloads the entire page, causing the app to lose its state. Instead, use React Router’s `Link` component, which changes the URL without a full page reload. Under the hood, `Link` eventually renders an `a` tag, but with special handling to prevent a refresh.

## Q: What is the difference between `Client Side Routing` and `Server Side Routing`?

A: In `Server-side routing or rendering (SSR)`, every change in URL, http request is made to server to fetch the webpage, and replace the current webpage with the older one.

In `Client-side routing or rendering (CSR)`, during the first load, the webapp is loaded from server to client, after which whenever there is a change in URL, the router library navigates the user to the new page without sending any request to backend. All `Single Page Applications uses client-side routing`.

# Routing 

## How you can Optimize your code Issues in SPA( Single page Application )
`Problem in SPA:`
- Bundling all your JavaScript code into a single file is sometimes simpler, but as your project grows, that file can become massive. This large file size means:
  - Slow initial page loads
  - Poor performance, especially on mobile/networks with low bandwidth
  - Users may download code they never us

`Solution`
- Divide your JavaScript single bigger bundle which was optimized by package bundlers now convert into smaller bundles/chunks that can be loaded independently and only when needed. This is called code splitting.
- It is known as Code Splitting/ Lazy Loading/ Dynamic Import / in React

```js

import React, { Suspense, lazy } from "react";

// 1. Dynamic import is used here by lazy, enabling code splitting at the component level. Use React.lazy() when you want to import React components only when they are needed, not at the time of initial page load
const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <h1>My App</h1>
      {/* 2. Suspense is a built-in React component used to "wait for" some code (or data) to be loaded before rendering its children*/}
      <Suspense fallback={<div>Loading...</div>}>
        {/* 3. LazyComponent will be loaded on-demand—when this component renders */}
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;

```

## Q: Does your package bundlers perform the code splitting by itself ?
-  No , If you do not explicitly tell your program where or how to split the code—typically by using dynamic import() statements or configuring multiple entry points—the bundler (eg - Webpack, Vite) will not automatically split your code simply on its own.
- What Actually Happens:
  - Bundlers split code based on your source code or configuration.
  - The main trigger for automatic, granular code splitting is when you use dynamic import() in your code.
  - If you write:
  ```js
  const MyComponent = () => import('./MyComponent');
  // From this above line Bundler understand and creates a separate chunk for MyComponent and only loads it on demand.
  ```