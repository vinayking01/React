import React, { useState, useEffect } from 'react'
import { databases } from '../appwrite/config'
import conf from '../conf'
function Todos({todo_list}) {
  const [todos, setTodos] = useState(todo_list)  // this should be same as attribute
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    setLoader(true)
    const getTodos = databases.listDocuments(conf.appwritedatabaseid,conf.appwriteCollectionid)

    getTodos.then(
      function (response) {
        setTodos(response.documents)
      },
      function (error) {
        console.log(error);
      }
    )
    setLoader(false)
  }, [])

  const deleteTodo = (document_id) => {
    const promise = databases.deleteDocument(conf.appwritedatabaseid,conf.appwriteCollectionid, document_id)
    promise.then(
      function (response) {
        console.log(response);
        
        // setting update todo after deletion
        setTodos((previous)=>{
          return previous.filter(todo => todo.$id !== document_id)
        })
      },
      function (error) {
        console.log(error);
      }
    )
    
  }


  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>

          {todos && todos.map(item => (
            <div key={item.$id} >
              <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                <div>
                  <p>{item.content}</p>
                </div>
                <div>
                  <span
                    className="text-red-400 cursor-pointer"
                    onClick={() => {
                      deleteTodo(item.$id)
                    }}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default Todos