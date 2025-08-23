/* eslint-disable react/display-name */
import React from 'react'

// This is actual card Component
const Card = function (props) {
    const {info} = props;

  return (
    <>
    <div>
        <img  alt={info.name} />
    </div>
    <h3>{info.name}</h3>
    <p>About : {info.description}</p>
    <div style={{display: 'flex', gap: '10px'}}>
    <p>Price : {info.price}</p>
    <p><b>Rating : {info.rating}</b></p>
    </div>
    </>
  )
}

// Higher Order Component : - This is our Higher order function. It will take the component as the argument and after adding the additional functionality return back the component. In the case i added the promoted tag in the card component.
const PromotedCard = function(Card)
{
    return (props) => {
        return(
        <div>
        <span style={{position:"relative", top : "0px" , left: "0px", backgroundColor : "black" , color:"white", padding:'2px 2px'}}>Promoted</span > 
        <Card info ={props.info} />
        </div>); 
};};

export {Card, PromotedCard};
