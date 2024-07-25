 // 1. first way of use Accessing the Items of DOM elements.As we know in React no Concept of DOM and accessing their elements but with the help of ref we can access it

// import { useState, useRef} from "react";

// export function UseRef_hook() {
//   const inputRef = useRef(null)  //initialize value
//   const [name,setName] = useState("")

//   console.log("Rerendering")

//   const handleClick = () => {
//     console.log(inputRef.current);
    
//   }
  
//   const handleClick2 = (e) => {
//     setName(e.target.value)
//   }
  

//   return (

   
    // <>
    // {/* Uncontrolled Components are the components that are not controlled by the React state and are handled by the DOM (Document Object Model). So in order to access any value that has been entered we take the help of refs. */}
    // <div>
    // Enter Name : <input ref={inputRef} type="text" name="name" id="" />
    // <button onClick={handleClick}>Click Please</button>
    // </div>
    
    // {/* React, Controlled Components are those in which form’s data is handled by the component’s state. It takes its current value through props and makes changes through callbacks like onClick, onChange, etc. */}
    // <form onSubmit={handleClick2}>
    // Enter Name : <input type="text" name="name" id="" value={name} onChange={handleClick2}/>
    // <button type="submit">Click Please</button>
    // </form>
    // </>

//   );

// }

// 2. 2nd way -= Persisting the Mutable value without UI update.
// it is same like useState but won't rerender the value if chgs

import { useState, useRef} from "react";

export function UseRef_hook() {
  const inputRef = useRef(null)  
  
  const countRef = useRef(0);
  const [ignored, forceUpdate] = useState(0);
  
  const incrementCount = () => {
    countRef.current++;
    console.log(countRef.current)
  //   forceUpdate(ignored + 1);  // Force re-render to display the updated count
  };

  return (

    <>
        <div>
          <p >Count: {countRef.current}</p>
          <button onClick={incrementCount}>Increment</button>
          <div>
            {/* <h1>{ignored}</h1> */}
          </div>
        </div>
    </>
  );

}