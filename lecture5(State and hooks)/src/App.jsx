import { useState } from 'react'
import './App.css'

function App() {
  const [count,setCounts] = useState(0); // syntax of State
  // var count = 0 ; // if you try this same concept without using state in react it won't render the updated value in UI. 
  function clicked(){
    setCounts(count+1)
    console.log(count)
  }

  function DataShow(){
    setUsers(user);
    console.log("data updated")
  }

const user  = [
  {name: "Aman", age: 40},
  {name:"Neetu" ,age : 30 },
  {name:"Babita",age : 34 },
]
  const [users,setUsers] = useState([]); 
  return (
    <>
    <p>Welcome to React</p>
    <button onClick={clicked}>click here</button>
    <p>{count}</p>
    <h3>Users data</h3>
    <button onClick={DataShow}>Check the User data</button>
    <div>
    {
      users.map((currdata,index)=>{
        return (
          <ul key={index}>
          <li >{currdata.name}</li>
          <li >{currdata.age}</li>
          </ul>
        )
      })
    }
    </div>
    </>
  )
}

export default App
