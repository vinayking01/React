import './App.css'
import {UseState_hook} from './UseState/useState_hook'
import { UseEffect_hook } from './UseEffect/UseEffect_hook'
import {UseContext_hook} from './UseContext/UseContext_hook'
import {UseRef_hook} from './UseRef/UseRef_hook'
import ForwardRef_Hook from './ForwardRef/ForwardRef'
import { UseReducer_hook } from './UseReducer/UseReducer_Hook'
import { UseLayout_hook } from './UseLayout/UseLayout_hook'
import UseMemo_hook from './UseMemo/UseMemo_hook'
import UseCallBack_Hook from './UseCallback/Use_CallBackHook'
import { useCustom_created } from './customHook/UseCustom_hook'

import {React, state, useEffect, useState} from 'react'

function App() {
  // const [name,setName] = useCustom_created('username','')
  
  // const onHandler = (event)=>{
  //   setName(event.target.value)
  // }
  console.log("Jai aur veru")
  return (
    <>
     {/* 1. useState Hook  */}
     {/* <UseState_hook /> */}

     {/* useEffect Hook */}
     {/* <UseEffect_hook /> */}

     {/* UseContext Hook */}
      {/* <UseContext_hook /> */}

      {/* UseRef Hook */}
      {/* <UseRef_hook /> */}

      {/* ForwardRef Hook */}
      < ForwardRef_Hook />

      {/* UseReducer_Hook  */}
      {/* <UseReducer_hook /> */}
      
      {/* UseLayout_Hook  */}
      {/* <UseLayout_hook/> */}

      {/* UseMemo_Hook  */}
      {/* <UseMemo_hook name="Abhi1" totalmarks={490} totalsubject={5}/> */}

      {/* UseCallback Hook */}
      {/* <UseCallBack_Hook /> */}

      {/* UseCustom Hook */}
      
    </>
  )
}

export default App
