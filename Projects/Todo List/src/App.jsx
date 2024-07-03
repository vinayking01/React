import './App.css'
import { DateTime } from './DateTime'
import { AddTask } from './AddTask'

function App() {

  return (
    <>
    <div className='OuterContainer'>
      <div>
      <h1 style={{textAlign : 'center', color:"white", fontFamily:"sans-serif"}}>This is Your Todo List </h1>
      </div>
  
      <DateTime />

      <AddTask />
    
    </div>

     
    </>
  )
}

export default App
