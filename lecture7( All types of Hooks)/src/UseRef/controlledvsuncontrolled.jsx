
// How it works: The inputValue state controls the value of the input field. As the user types, the onChange event updates the state, causing the component to re-render with the new value.
// ## Q: Controlled Components
// - Controlled components in React ensure that the form data is handled by the React state, providing a consistent and predictable way to manage user input. Simply means controlled though react state or props.
// - This approach involves :
//     - managing state in the parent component and passing to child
//     - passing values and state updater functions as props to child components
//     - handling user input with event handlers
//     - updating state in the parent component.
// - This approach simplifies validation, makes data handling predictable, and facilitates integration with complex UI libraries.

import { useState } from "react";

export function ControlledComponent() {
  const [inputValue, setInputValue] = useState(""); // React state controls the value

  return (
    <div>
      <input
        type="text"
        value={inputValue} // Input value is controlled by state
        onChange={(e) => setInputValue(e.target.value)} // Updates state on change
      />
      <p>Input value: {inputValue}</p>
    </div>
  );
}




// Uncontrolled example 

import { useRef } from "react";

export function UncontrolledComponent() {
  const inputRef = useRef(null); // Create a ref for the input element

  const handleSubmit = () => {
    alert(`Input value: ${inputRef.current.value}`); // Access value using the ref
  };

  return (
    <div>
      <input type="text" ref={inputRef} /> {/* No React state controlling this */}
      <button onClick={handleSubmit}>Show Input Value</button>
    </div>
  );
}


// How it works: Instead of using useState to control the input, useRef is used to get the current value of the input from the DOM when needed (like on form submission). The input's value is not directly tied to React state.

// ## Q: Uncontrolled Components
// - Uncontrolled components in React manage their own state internally rather than relying on React state. This approach is useful for simple forms where you don't need to manipulate the input data through React state updates.
// - Uncontrolled components bypass React's state management for handling form inputs.
// - This approach involves :
//     - Direct DOM Access with useRef Hook: -  In functional components, the useRef hook allows us to create a mutable reference that persists across renders.
//     - Accessing an Element's Value on Submit

