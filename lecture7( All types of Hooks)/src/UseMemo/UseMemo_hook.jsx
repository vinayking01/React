
import {memo, useMemo,useState } from "react";
import Percentage  from "./Final_Percentage";

// All subjects are of 100 numbers.
const UseMemo_hook = (({name,totalmarks,totalsubject})=>{

  const [count, setCount] = useState(0);

    console.log("First inner component")
    const Marks = useMemo(() =>{
      console.log("Percentage changes Rendering")
      return ((totalmarks*100)/500);
    },[totalmarks]); 

    function increase(){
      setCount(count+1);
      console.log("sdsd")
    }

    return (
        <>
            <div>
              <h1>count {count}</h1>
              <h2>Student Name :{name}</h2>
              <h2>Total Marks: {totalmarks}</h2>
              <h3>Total Subject : {totalsubject}</h3>
              <h4>Percentage - {Marks} </h4>
             
            </div>
            <div>
              <button onClick={increase}>Click Please</button>
            </div>
           <Percentage totalmarks={Marks}/>
        </>
      );
})
export default memo(UseMemo_hook);