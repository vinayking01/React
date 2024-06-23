# Events Handling in React 

1. Remember how we haven't called this function, if you call this function here  then it will run without even clicking. You just need to pass reference and not call here.
2. In React, event handlers receive the event object as an argument by default.This event object contains information about the event, such as the type of event, the target element, and more. However, when you use an arrow function directly in the onClick attribute without passing the event explicitly, React doesn't pass the event object to your handler function. This is because the arrow function creates a new function and calls your handler without passing any arguments. 

    ### Syntax
    ```
    const handleButtonClick4 = (event) => 
    {
    console.log(event);
    console.log(event.target);
    alert("Hey I am onClick Event");
    };

    <button onClick={(event) => handleButtonClick4(event)}>click Me 4 </button>

    ```

## (a) Passing Events as Props
1. Passing event handlers as props in React.js is a common pattern used to allow child components to communicate with parent components.

## (B) Event Propogation
1. Event propagation in React follows the same principles as in the DOM, consisting of three phases:
2. Capturing Phase: The event starts from the root of the document and propagates down to the target element. (use OnClickCapture = {event1})
3. Bubbling Phase: The event bubbles up from the target element to the root of the document. ( use OnClick = {event1})
4. Stopping Propagation: You can stop the event from propagating further using event.stopPropagation().

    ### Syntax
    ```

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

    ```
