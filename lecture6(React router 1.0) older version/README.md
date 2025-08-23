# React Router ( older Version COoncept)
1. React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application without reload, allows changing the browser URL, and keeps UI in sync with the URL.
2. It increase the speed of the website sync.
3. It is not present in React we have different library for this which needs to be installed.
4. Required why - React Router is essential for creating single-page applications (SPAs) where navigation among different views or components is required without refreshing the whole page.
5. There are 3 types of Router BrowserRouter, Hash router, Memory router.
6. This is used for Routing in client side.
7. When using React Router, only the components specified within the Route component will change based on the route. Any elements or components placed outside the Route components will remain consistent across all pages. This is useful for elements like navigation bars or footers that should stay the same regardless of the current route.
8. This code is the Older version of React Router which does not support data API. 

## Workflow
    ``` js
    
    [Click "Home"] -> [URL changes to /home] -> [BrowserRouter matches /home] -> [Renders Home component]

    ```


### Syntax
    ``` js
        // Navigation Component
    import { Link } from 'react-router-dom';

    function Navbar() {
    return (
        <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        </nav>
    );
    }

    // App Component using BrowserRouter
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import Home from './Home';
    import About from './About';
    import Navbar from './Navbar';

    function App() {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
        </Router>
    );
    }

    // App Component using HashRouter
    import { HashRouter as Router, Route, Routes } from 'react-router-dom';

    function App() {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
        </Router>
    );
    }

    ```

### Important Point 
1. We wrap our content first with "BrowserRouter".

2. Then we define our "Routes". An application can have multiple "Route". Our basic example only uses one.

3. "Route" can be nested. The first "Route" has a path of '/' and renders the Layout component.

4. The nested "Route" inherit and add to the parent route. So the blogs path is combined with the parent and becomes /blogs.

5. The Home component route does not have a path but has an "index" attribute. That specifies this route as the default route for the parent route, which is '/'.

6. Setting the path to '*' will act as a catch-all for any undefined URLs. This is great for handling 404 error page.

7. The "Outlet" renders the current route selected.


---
-- Anytime we link to an path, we will use "Link" with routes to handle navigation instead of anchor tag " a href=""  " as it won't work .

```
-React Router’s <Link> component is designed for client-side routing, which enables seamless navigation without full-page reloads. whereas when you use <a></a> it reloads the page.
-Routes are necessary for <Link> to function because they define what component should render when a specific path is visited.
```