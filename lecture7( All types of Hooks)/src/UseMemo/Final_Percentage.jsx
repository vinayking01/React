import React, { memo } from 'react';

export default memo(function Percentage({ totalmarks }) {
  const Per = (totalmarks * 100) / 500;
  console.log("component re-renders");
  return (
    <>
      <h3>My percentage: {Per}</h3>
    </>
  );
});