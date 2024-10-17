import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo,removeTodo } from './app/features/todo/todoSlice';
import TodosList from './todos';

function App() {
  const [your_input, SetInput] = useState('');
  const Dispatch = useDispatch();

  // addToHandler function 
  const addTodoHandler  = (e) =>{
    e.preventDefault()
    if(your_input == '')
      return;
    Dispatch(addTodo(your_input))
    SetInput('');
  }

  return (
    <>
      <h1 className='text-center text-3xl font-bold'>Todo list</h1>
      <div className="bg-[#8b2dc1] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">

            {/*  form Section - sending your todo */}
            <form className="flex">
              <input
                type="text"
                value={your_input}
                onChange={(e)=>{SetInput(e.currentTarget.value)}}
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              />
              <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
              onClick={(e)=>{
                addTodoHandler(e);
              }}
              >
                Add
              </button>
            </form>
          </div>
          <div className="3">
          <TodosList />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
