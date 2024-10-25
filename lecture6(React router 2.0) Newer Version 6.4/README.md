### For Doubts - 
    https://youtu.be/g4x0QbAibYg?feature=shared

### Nested Routes in React Router

### Not found route
1.  ## Syntax - 
    ```
    <Route path='*' element={<h3>Page Not Found</h3>}>
    ```

### Dynamic Routing

### Lifecycle of React Component
1. the series of the events that happen from mounting of react component to its unmounting.
 -  Mounting - is birth of your component.
 - Update  - Growth of your component.
 - Unmounting - Death of your component.

2. Mounting is the stage where the component is created and inserted into the DOM.
3. Component's life progresses through growth and update phases
4. Methods like componentDidMount, componentDidUpdate, and componentWillUnmount are commonly used in React component lifecycle.
5. These methods help in managing component lifecycle events like creation, update, and removal.
For better understanding look at - w3schools and for Diagram flow  - https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/ 


## Important Point - 
1. The Outlet component in React Router is used for nested routing. It serves as a placeholder for child routes to be rendered. When you define nested routes, the Outlet component renders the matched child route's component within the parent component. This is useful for creating layouts with nested views, such as dashboards with sub-sections.