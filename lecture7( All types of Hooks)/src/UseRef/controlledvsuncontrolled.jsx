

import { useState } from "react";

function ControlledComponent() {
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

export default ControlledComponent;

// How it works: The inputValue state controls the value of the input field. As the user types, the onChange event updates the state, causing the component to re-render with the new value.


// Uncontrolled example 

// import { useRef } from "react";

// function UncontrolledComponent() {
//   const inputRef = useRef(null); // Create a ref for the input element

//   const handleSubmit = () => {
//     alert(`Input value: ${inputRef.current.value}`); // Access value using the ref
//   };

//   return (
//     <div>
//       <input type="text" ref={inputRef} /> {/* No React state controlling this */}
//       <button onClick={handleSubmit}>Show Input Value</button>
//     </div>
//   );
// }

// export default UncontrolledComponent;

// How it works: Instead of using useState to control the input, useRef is used to get the current value of the input from the DOM when needed (like on form submission). The input's value is not directly tied to React state.
