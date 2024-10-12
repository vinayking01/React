 // 1. first way of use - Accessing the Items of DOM elements.As we know in React no Concept of DOM and accessing their elements but with the help of ref we can access it

// import { useState, useRef} from "react";

// export function UseRef_hook() {
//   const inputRef = useRef(null)  //initialize value
//   const [name,setName] = useState("")

//   console.log("Rerendering")

//   const handleClick = () => {
//     console.log(inputRef.current.value); 
//   }
    

//   return (
//     <>
//     <div>
//     Enter Name : <input ref={inputRef} type="text" name="name" id="" />
//     <button onClick={handleClick}>Click Please</button>
//     </div>
//     </>

//   );

// }

// 2. 2nd use of Ref = Persisting the Mutable value without UI update.Unlike useState, updating a useRef value does not trigger a re-render of the component. This is particularly helpful when you need to store information (like the previous value of an input, timers, or DOM elements) but don't want the component to re-render every time the value changes.

import { useState, useEffect, useRef } from "react";


export function UseRef_hook() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

