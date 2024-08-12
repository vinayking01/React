
import React, { useState } from 'react'
import  OnClick from './components/oneClick_fnc'
import  OnHover  from './components/oncHover_fnc'
import { HOComponent } from './components/HigherOrderComp'

function App() {
  return (
    <>
    {/* <OnClick/> */}
    <OnClick />
    <OnHover/>

    </>
  )
}

export default App
