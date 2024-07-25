import React, { useState, useCallback, memo } from 'react';

// Define the Percentage component and memoize it
const Percentage = ({ totalmarks, onButtonClick }) => {
  const Per = (totalmarks * 100) / 500;
  console.log("rerendering Percentage component");
  return (
    <>
      <h3>My percentage: {Per}</h3>
    </>
  );
};

// Define the parent component using the useCallback hook
const  UseCallBack_Hook = () => {
  const [totalmarks, setTotalmarks] = useState(450);

  const handleClick = memo(useCallback(() => {
    console.log('Button clicked');
  }, [])); // No dependencies, so the function is memoized and doesn't change

  return (
    <div>
      <Percentage totalmarks={totalmarks} onButtonClick={handleClick} />
      <button onClick={() => setTotalmarks(totalmarks + 10)}>Increase Marks</button>
    </div>
  );
};

export default UseCallBack_Hook;