import React, { useState, useEffect } from 'react'
import MyData from "../Data.json"
import {Card, PromotedCard} from './components/Card'

function App() {
  const [data, getData] = useState(null);

  let MyPromotedCard = PromotedCard(Card); // Calling the higher order component with the Card component as an argument.

  useEffect(()=>{
     getData(MyData.data.dishes);
    },[])
    
    console.log("Data fetched successfully",data);

  return (
    <>
      <h2>Restaurant Dishes</h2>
      <div style={{display : "grid", columnGap: '50px', gridTemplateColumns : '200px 200px 200px 200px', justifyContent : 'center', width:"auto"}}>
        {data?.map((item)=>{
          return (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px', width: "200px", height: "auto", border : '3px solid black'}}>
              {
                item.isPromoted ? <MyPromotedCard info ={item} />: <Card info ={item}/>
              }
            </div>
          )
        })}
      </div>
    </>
  )  
}

export default App;
