import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleTodo, EditAbleTodoMsg, toggleEditable } from "./app/features/todo/todoSlice";

function TodosList() {
    const todoList = useSelector((state) => state.todos); // Get todos from the store
    const dispatch = useDispatch();
    let TodoEditable = true;

    // Dispatch the action to update todo text 
    const handleEditChange = (e, id) => {
        const newText = e.target.value;
        dispatch(EditAbleTodoMsg({ id, text: newText })); 
    };

    

    return (
        <>
            <ul className="list-none">
                {todoList.map((todo) => (
                    <li
                        className="mt-4 flex items-center bg-zinc-800 px-4 py-2 rounded"
                        key={todo.id}
                    >
                        {/* checkbox - shows todo completed   */}
                        <div className="w-1/12">
                            <input
                                type="checkbox"
                                className="cursor-pointer"
                                checked={todo.checked && !todo.editable} // Directly determine checked state
                                onChange={() => {

                                    if (todo.editable) {
                                        alert("Save your todo first"); // checked btn alert - save todo before make check or completed 
                                    } else {
                                        dispatch(toggleTodo(todo.id)); // Handle checkbox toggle if editable
                                    }
                                }}
                            />
                        </div>

                        {/* Todo items text presented inside the input field  */}
                        <div className="w-9/12">
                            <input
                                type="text"
                                value={todo.text} // The input's value is bound to todo.text
                                disabled={!todo.editable || todo.checked} // Disable editing if not editable or checked
                                onChange={(e) => handleEditChange(e, todo.id)} // Call function to update todo text
                                className={` text-white w-full bg-black ${(todo.checked && !todo.editable) ? "line-through" : ''} `}
                            />
                        </div>

                        {/* save or edit btn for list of todos  */}
                        <button
                            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                            onClick={() => {
                                if (todo.checked) return;
                                TodoEditable = !TodoEditable;
                                // Toggle the editable state
                                dispatch(toggleEditable(todo.id));
                            }}
                        >
                            {todo.editable ? "📁" : "✏️"}
                        </button>

                        {/* Deleted btn for removing the todos */}
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))} // Remove the todo item
                            className="text-white w-1/12 bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TodosList;
