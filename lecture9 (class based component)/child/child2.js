import React, { Component } from 'react'
import { useEffect } from 'react'

export class Child2 extends Component {

    constructor(props) {
    super(props);
    
     console.log("Child2 constructor called");
    }

  componentDidMount() {
    console.log("Child2 componentDidMount called");
  } 

  render() {
    console.log("Child2 render called");
    return (
         <h4>I am inside {this.props.name}</h4>
    )
  }
}

export default Child2;