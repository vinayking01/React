
# Episode 11 - Data is the new oil

## Q: Lifting State Up
- Move state to the nearest common parent to share and synchronize data across multiple child components.
- Ensures a single source of truth for shared data. Enables controlled components by moving shared state to a parent.
- Parent owns the state, passes it down as props, and provides callbacks to update state.
- When to use:
    - When sibling components need to communicate.
    - When you need to control a child’s value from the parent.
- Great import example - [Lifting State Up](https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example)


## Q: Controlled Components
- Controlled components in React ensure that the form data is handled by the React state, providing a consistent and predictable way to manage user input. Simply means controlled though react state or props.
- This approach involves :
    - managing state in the parent component and passing to child
    - passing values and state updater functions as props to child components
    - handling user input with event handlers
    - updating state in the parent component.
- This approach simplifies validation, makes data handling predictable, and facilitates integration with complex UI libraries.


## Q: Uncontrolled Components
- Uncontrolled components in React manage their own state internally rather than relying on React state. Here, the value is handled by the DOM itself. Instead of using React state to control the value, you rely on Refs to access the input value directly from the DOM.

- This approach is useful for simple forms where you don't need to manipulate the input data through React state updates.
- Uncontrolled components bypass React's state management for handling form inputs.
- This approach involves :
    - Direct DOM Access with useRef Hook: -  In functional components, the useRef hook allows us to create a mutable reference that persists across renders.
    - Accessing an Element's Value on Submit

