
import React from 'react';

const EventPropagationExample = () => {
  const Parent = (event) => {
    console.log('Parent clicked');
  };

  const Child = (event) => {
    console.log('Child clicked');
    // event.stopPropagation(); // Stops the event from bubbling up to the parent
  };

  return (
    <div
      onClick={Parent}
      style={{ padding: '20px', border: '2px solid black' }}
    >
      Parent
      <div
        onClick={Child}
        style={{ padding: '20px', border: '2px solid red' }}
      >
        Child
      </div>
    </div>
  );
};

export default EventPropagationExample;