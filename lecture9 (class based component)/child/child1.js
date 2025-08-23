import React, { Component } from 'react'
import { useEffect } from 'react'

export class Child1 extends Component {

  constructor(props) {
    super(props);    // calling parent constructor. because we are extending Component class . need to call because always call parent constructor first
    // initializing state variable
    // state variable is used to store data that can change over time
    // props are used to pass data from parent to child component

    this.state = {
      name: props.name, // making your props as state variable 
      age : 10    // default value of state variable
    };

    console.log("Child1 constructor called");
  }


  componentDidMount() {
    console.log("Child1 componentDidMount called");
  }

  render() {
    console.log("Child1 render called");
    return (
      <>
      <h4>I am inside {this.props.name}</h4>
      <p> My age is {this.state.age}</p>

      <button onClick={()=>{this.setState(prevAge => ({age : prevAge.age +1}))}}> Click Me</button>
      </>
    )
  }
}

export default Child1