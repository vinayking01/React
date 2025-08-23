import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Child1 } from './child/child1'
import { Child2 } from './child/child2'
import { useEffect } from 'react'

export class Parent extends Component {
  constructor() {
    super();
      console.log("Parent constructor called");
  }

  componentDidMount() {
    console.log("Parent componentDidMount called");
  }


  render() {
    console.log("Parent render called");
    return (
      <>
       <h1>Class based component</h1>

      <Child1 name="Child1"/>
      <Child2 name="Child2" />
      </>
    )
  }
}
