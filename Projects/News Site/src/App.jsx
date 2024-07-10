import React, { Component } from 'react'
import { NavBar } from './Components/NavBar'
import { Outlet } from 'react-router-dom' 


export default class App extends Component {

  render() {
    return (
      <>
      <div>
      <NavBar />
      <Outlet /> 
      </div>
      </>
    );
  }
}

