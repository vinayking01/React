import React from 'react'

export default function UserCard(props) {
    const {name , age, greetings} = props;
  return (
    <>
     <h5>Name : {name}</h5> 
     <p>Age : {age} </p>
     <h6> {greetings}</h6>
     <h5>{props.children}</h5>
    </>
  )
}
