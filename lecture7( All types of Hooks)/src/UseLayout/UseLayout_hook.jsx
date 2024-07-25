import { useState, useLayoutEffect, useEffect } from "react";

export function UseLayout_hook() {
    const [count, UpdateValue] = useState(0);

     const update =()=>{
        UpdateValue(count+1);
        console.log(count)
     }
    
     useEffect(()=>{
        console.log("Second Layout")
    },[])


    useEffect(() => {
        console.log("First Layout")
    },[])


    useEffect(()=>{
        console.log("third Layout")
    },[])

    return (
    <>
        <div>
          <p>{count}</p>
          <button type="button" onClick={update}>Click Here</button>
          <div>
        </div>
        </div>
    </>
  );

}