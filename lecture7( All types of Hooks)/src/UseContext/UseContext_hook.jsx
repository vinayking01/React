
import { useState, createContext} from "react";
import { Child1} from "./Child1";
import {SiblingChild1} from "./SiblingChild"
import {SiblingChild2} from "./SiblingChild"

const UserContext = createContext({name : "Anonymous" , age: "32"});   //1. To create context, you must Import createContext and initialize it, By default you can give some value to the context.

function UseContext_hook() {
  const [user, setUser] = useState({ name: "Jessi", age : 25 , gender : "female"});

  return (
    <>
     <UserContext.Provider value={{user, setUser}}>  
       {/* 2. Wrap child components in the Context Provider and supply the state value or any value u wanna share . */}
      <h1>{`Hello ${user.name}! Welcome back`}</h1>
      <Child1 />
    <SiblingChild1/>
    </UserContext.Provider>
    <SiblingChild2/>
    
    </>
  );
}

export {UserContext,UseContext_hook};


//1. Default Value vs. Updated Value
// - If you call useContext(UserContext) in a component within the same program where UserContext is created, but that component is not wrapped inside a corresponding <UserContext.Provider>, then React will return the default value passed to createContext(defaultValue).
// - If you call useContext(UserContext) inside a provider, you'll get the current provider's value