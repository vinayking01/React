## Router

## 1. Introduction to React Router & React Router DOM is it both different?
    - For routing we use React Router, but we have React Router DOM (the version of React Router built specifically for web browsers with more features).
    - Why both? Because react-router is the core library (framework-agnostic), and react-router-dom is the browser-specific implementation that adds DOM-related components like <Link>, <BrowserRouter>, etc.
    - Check GFG React Router vs React Router DOM blog.

## installation
```js
npm install react-router-dom

```
## 2. Different Types of Routers
✅ The 3 Classic Routers in React Router
| Router         | Description |
|----------------|-------------|
| **BrowserRouter** | Uses the HTML5 History API (`pushState`) for clean URLs like `/about`. |
| **HashRouter**    | Uses the URL hash (`#`) to simulate routing, e.g., `/#/about`. |
| **MemoryRouter**  | Stores the history in memory (not in the browser) — commonly used for tests or React Native apps. |


- The classic router is now old , `createBrowserRouter`, `createHashRouter`, and `createMemoryRouter` are the "new form" or evolution of the classic routers (`BrowserRouter`, `HashRouter`, `MemoryRouter`) introduced in React Router v6.4+.

✅ Why the change?
- Fetching data before rendering a route (with loader)
- Handling form submissions (with action)
- Route-specific error handling

## 4. What is BrowserRouter? Setting up the Browser Router
- BrowserRouter is the simplest router in React Router.
- You define routes inside JSX using `Routes` and `Route` components directly in your app.
- It's only support jsx based routing style.
- It uses the browser’s History API (pushState, replaceState) to change the URL without refreshing the page.
- Good for basic SPAs (Single Page Applications) 
- You don’t need advanced route-level features.
- You wrap your entire app inside it so routing works everywhere.
- Each `Route` component should include:
    - path → The exact URL path that will cause the route to render.
    - element → The component to be rendered for that path.

```js 

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

```
## 5. CreateBrowserRouter is what? and setting up.
- A function introduced in React Router v6.4+ as part of the Data APIs.
- It support both type of styles jsx and Objects.
- Lets you define routes as objects or using `createRoutesFromElements`.
- Integrates deeply with loaders, actions, and error boundaries for data fetching and form handling.
- Works with `RouterProvider` instead of `BrowserRouter`.
- RouterProvider is like the `BrowserRouter` wrapper — it makes your router accessible across your app.
- `RouterProvider` needs you to pass a router instance created by `createBrowserRouter`. It works only with `createBrowserRouter`.

- Step 1: Create your routes
``` js
    import { createBrowserRouter } from "react-router-dom";
    import Home from "./Home";
    import About from "./About";

    const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> }
    ]);

    export default router;

```
- Step 2: Use RouterProvider in your root
``` js
    import { RouterProvider } from "react-router-dom";
    import router from "./router";

    export default function App() {
    return <RouterProvider router={router} />;
    }


```

## Different Styles ways of Defining the routes in routing section
- React Router gives two styles for defining routes:
    1. JSX-based route definition (declarative style)
    ``` js
     createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="about" element={<About />} />
    </Route>
  )
    ```
    2. Object-based route definition (good for data APIs and programmatic configs).
    ``` js
        const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
        { path: "about", element: <About /> }
        ]
    }
    ]);

    
    ```

## 6. Navigation – Link vs NavLink
- When building a website using HTML, we use the `a` tag to create links to other pages.
- A side effect of the `a` tag is that it causes the page to reload.
- React Router offers two solutions for SPA navigation: `Link` and `NavLink`.
- Difference:
   - `Link` just navigates without reload.
   - `NavLink` also adds an active class when the URL matches, making it useful for styling active menu items.


## 7. Dynamic Routes & URL Parameters
- React Router allows us to use URL parameters to create dynamic routes. Example: /articles/:id → :id is the parameter.
- React Router provides a hook useParams() for accessing the value of URL parameters.

``` js
    import { useParams } from "react-router-dom";

    function Article() {
    const { id } = useParams();
    return <h1>Article ID: {id}</h1>;
    }

```
``` js
    <Route path="articles/:id" element={<Article />} />

```

## 8. Nested Routes
```js 

<Route path="/profile" element={<Profile />}>
  <Route path="edit" element={<EditProfile />} />
</Route>
```

## 9. Redirecting Users

- A common case: Redirecting to /sign-up if a user tries to access /profile without authentication.
- `Navigate` → A component that changes the browser’s current location.
``` js
import { Navigate } from "react-router-dom";

function Profile({ loggedIn }) {
  if (!loggedIn) return <Navigate to="/sign-up" />;
  return <h1>Welcome</h1>;
}
```

- `useNavigate()` → A hook that allows programmatic navigation (also supports going back and forward in history).
``` js

import { useNavigate } from "react-router-dom";

function Profile({ loggedIn }) {
  const navigate = useNavigate();
  if (!loggedIn) {
    navigate("/sign-up");
  }
  return <h1>Profile Page</h1>;
}

```

## 10. Outlet (for nested routes & layouts)
- `Outlet` is a placeholder inside a parent route’s element where the matched child route will render. If you define nested routes but forget `Outlet`, the children won’t appear.
- The Outlet component in React Router is used for nested routing. It serves as a placeholder for child routes to be rendered. When you define nested routes, the Outlet component renders the matched child route's component within the parent component. This is useful for creating layouts with nested views, such as dashboards with sub-sections.

### For Doubts - 
- https://youtu.be/g4x0QbAibYg?feature=shared
- [https://www.codecademy.com/learn/learn-react-router/modules/learn-react-router/cheatsheet](Codeacademy Cheetsheet)

### Not found route
1.  ## Syntax - 
    ```
    <Route path='*' element={<h3>Page Not Found</h3>}>
    ```