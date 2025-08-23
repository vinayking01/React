  import { useContext, useEffect } from "react";
  import { UserContext} from "./UseContext_hook";

  export function Child4() {
    const data = useContext(UserContext);

    useEffect(()=>{
      // This effect runs when the component mounts
      data.setUser({name : "Jai", age: 26}); // Example of updating the context state
    },[])

    console.log(data);
  return (
    <>
      <h1>This is Child 4</h1>
      <h2>{`Hello ${data.user.name} again!`}</h2>
      <br />
      <h3>{`You reached the Child 4 finally!`}</h3>
    </>
  );
  }
