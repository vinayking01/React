import React, { forwardRef } from 'react';

// Child component that forwards the ref to the input element
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} type="text" placeholder="Type here..." />;
});

export default CustomInput;
