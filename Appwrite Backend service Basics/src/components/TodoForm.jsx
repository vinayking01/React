import React, {useState} from 'react'
import {ID} from 'appwrite'
import {databases} from '../appwrite/config'
import conf from '../conf'
import {v4 as uuidv4} from 'uuid'
import Todos from './Todos'


function TodoForm() {
    const [content, setTodo] = useState("") // this variable should be same name as your attributes in AppWrite Database

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("called")
        const promise = databases.createDocument(conf.appwritedatabaseid,conf.appwriteCollectionid, uuidv4(), {
            content
        })
        console.log(promise);
        promise.then(
            function(response){
                console.log("success",response);
                window.location.reload() // handle it in different way
            },
            function(error){
                console.log("failed",error);
                alert("todo not added getting some error")
            }
        );
        
        e.target.reset();
        
    }


  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
        action=""
    onSubmit={handleSubmit}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => {
            setTodo(e.target.value)
          }}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
      <div>
      <Todos />
      </div>
      {/* TODOS BOX */}
      
    </div>
  )
}

export default TodoForm