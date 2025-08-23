import React, { useState,useCallback } from 'react';

const ChildComponent = ({ onIncrement, onReset, count }) => {
  console.log("ChildComponent rendered");
  
  return (
    <div>
      <h2>Current Count: {count}</h2>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

const UseCallBack_Hook = () => {
  const [count, setCount] = useState(0);

  // No useCallback, so new function instances are created on every render
  const increment = () => setCount((prev) => prev + 1);
  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <ChildComponent onIncrement={increment} onReset={reset} count={count} />
    </div>
  );
};

export default UseCallBack_Hook;
