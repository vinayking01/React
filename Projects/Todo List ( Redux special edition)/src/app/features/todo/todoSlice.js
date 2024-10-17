import { createSlice, nanoid } from "@reduxjs/toolkit";

// initial state
const initialState = {
  todos: [{ id: 1, text: "Hello world", checked: false , editable: false }],
};

// creating slice
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newtodo = {
        id: nanoid(),
        text: action.payload,
        checked: false,
        editable: false
      };
      state.todos.push(newtodo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      state.todos.map((item) => {
        if (item.id === action.payload) {
          item.checked = !item.checked;
        }
      });
    },
    // Reducer to update the text of the specific todo
    EditAbleTodoMsg: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((item) => item.id === id);
      if (todo) {
        todo.text = text; // Update the text for the specific todo
      }
    },
    toggleEditable: (state, action) => {
        const todo = state.todos.find((item) => item.id === action.payload);
        if (todo) {
          todo.editable = !todo.editable; // Toggle the editable state
        }
      },


    //   I was confused here little bit why the changes actually occurred in real todos List when i performed the function 'EditAbleToMsg' , and 'toggleEditable' 
    //When you find a todo in the todos array, you get a reference to that specific todo object. This means any changes you make to the properties of that todo directly affect the original object in the array.Mutating Objects: When you do something like todo.text = text;, you're not creating a new object; you're directly modifying the existing one. This is why the change is reflected in the state.
    // in Object you know reference you receive not a copy.
  },
});

// exporting the functionality
export const { addTodo, removeTodo, toggleTodo, EditAbleTodoMsg ,toggleEditable} =
  todoSlice.actions;

// Letting the store know about the reducer
export default todoSlice.reducer;
