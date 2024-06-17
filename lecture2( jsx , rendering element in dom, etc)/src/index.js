import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


//1. example  uses pre-written single app.js component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 2. another example of sending the react element in DOM
// const element = <h1>Hello, world! jsj</h1>;
// root.render(
//   element
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
