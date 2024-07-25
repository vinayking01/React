
import { useState, createContext, useContext } from "react";
import { Component2} from "./Child2";

const UserContext = createContext();   //1. To create context, you must Import createContext and initialize it:

 function UseContext_hook() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>  {/*2. Wrap child components in the Context Provider and supply the state value.*/}
      <h1>{`Hello ${user}!`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

export {UserContext,UseContext_hook};
