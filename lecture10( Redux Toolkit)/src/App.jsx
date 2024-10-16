import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, Reset } from './features/counter/CounterSlice'
import './App.css'

function App() {


  //UseSelector :  This is a React hook that allows you to access data (state) from the Redux store.
  // UseDispatch : This is a React hook that allows you to send actions to the Redux store, triggering state changes.

  const count = useSelector((state) => state.counter.value)
  const [number, SetNumber] = useState("")
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment + 
        </button>
        <br /><br />
        <span>{count}</span>
        <br /><br />

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement - 
        </button>
        <br />
        <br />
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(Reset())}
        >
          Reset Number to 0
        </button>
        <br />
        <br />
        <input type="number" value={number} onChange={(e) => {
          SetNumber(e.currentTarget.value)
        }}
        />
        <button onClick={() => { dispatch(incrementByAmount(number)) }}> Submit Your Number</button>
      </div>
    </div>
  )
}

export default App
