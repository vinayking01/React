
import { useEffect, useState } from 'react'

export  function UseEffect_hook() {
    const [count, setCount] = useState(0);
    const [count2,setCount2] = useState(0);

    function increaseValue() {
        setCount(count + 1);
    }
    //if no dependency passed, it Runs on every render
    useEffect(()=>{
        console.log("Hello 1");
    })

    //if empty array passed, it Runs on every first render
    useEffect(()=>{
        console.log("Hello 2")
    },[])

    //if dependency passed , it runs on every first render and also when the dependency value changes.ss
    useEffect(()=>{
        console.log("hello 3")
    },[count])

    useEffect(()=>{
        console.log("hello 4")  // even if i don't render it will run only single time and also if i don't change the value of count2, it will run  single time
    },[count2])

    return (
        <>
            <h1>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={increaseValue}>Click the button</button>
                    <h3>{count}</h3>
                </div>
            </h1>
        </>
    )
}
