import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  console.log(import.meta.env.VITE_React_APP_APPWRITE_URL)
  console.log(import.meta.env.VITE_SOME_KEY)

  return (
    <>
     <div>
      <h1>Hello World</h1>
     </div>
    </>
  )
}

export default App
