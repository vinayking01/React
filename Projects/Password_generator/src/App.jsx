import { useState,useCallback, useEffect , useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed , setNumber] = useState(false);
  const [characterAllowed , setCharacter] = useState(false);
  const [password , setPassword] = useState("");

  let PasswordRef = useRef(null)

  const passwordGenerator =  useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(characterAllowed) str+= "#$%^&*@?"
    
    for(let i =1 ; i<=length ; i++)
    {
      let chooseChar  = Math.floor(Math.random() * (str.length +1));
      pass = pass + str.charAt(chooseChar);
    }

    setPassword(pass)

  },[length,numberAllowed,characterAllowed,password])


  // password generator function which runs on every change
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,characterAllowed])


  let copyPasswordToClipboard = useCallback(()=>{
    PasswordRef.current?.select();  // for selection 
    console.log(PasswordRef.current.value)
    window.navigator.clipboard.writeText(password)  // this is for selection from clipboard
  },[password])

  return (
    <>
    <div className='flex items-center justify-center h-screen bg-black'>
    <div className='shadow-md  rounded-lg px-4 bg-gray-400 mb-4 w-full max-w-lg h-1/3'>
      <h1 className='text-4xl text-center'> Password Generator </h1>
      <div className='flex shadow rounded-lg overflow-hidden w-full m-auto border-4 '>
      <input type="text" name="password" id="password" className='rounded-lg p-3 m-2 w-full'  placeholder="Password" value={password} ref={PasswordRef} readOnly />
      <button type="button" onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0 h-auto '>Copy</button>

      </div>
      <div className='flex text-sm gap-x-2 text-blue-400 text-rose-600 '>
        <div className='flex items-center gap-x-1 mx-3 '>
          <input type='range' min={6}  max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length : {length}</label>
        </div>
      <div>
        <input type="checkbox" id='NumberInput' defaultChecked={numberAllowed} onChange={()=>{setNumber(prev => (!prev))}}/>
        <label htmlFor='NumberInput'>: Allow Number</label>
      </div>
      <div>
        <input type="checkbox" id='CharacterInput' defaultChecked={characterAllowed} onChange={()=>{setCharacter(prev => (!prev))}}/>
        <label htmlFor='CharacterInput'>: Allow Character</label>
      </div>
      </div>
    </div>
    </div>
     
    </>
  )
}

export default App
