import React, { useRef } from 'react';
import CustomInput from './Child'; // Import the child component

function ForwardRef_Hook() {
  const inputRef = useRef(null); // Create a ref for the input element

  const focusOnInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field using the ref
    }
  };

  return (
    <div>
      {/* Pass the ref to the CustomInput component */}
      <CustomInput ref={inputRef} />
      <button onClick={focusOnInput}>Focus Input</button>
    </div>
  );
}

export default ForwardRef_Hook;
