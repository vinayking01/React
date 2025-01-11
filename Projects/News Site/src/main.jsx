import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import News from './Components/News';


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const MyRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} > 
    <Route index element={<News pageSize={18} country="in" category="general"/>} />
    <Route exact path='business' element={<News pageSize={18} key="business"  country="in" category="business"/>} />
    <Route exact path='entertainment' element={<News pageSize={18} key="entertainment" country="in" category="entertainment"/>} />
    <Route exact path='health' element={<News pageSize={18} key="health" country="in" category="health"/>} />
    <Route exact path='sports' element={<News pageSize={18} key="sports" country="in" category="sports"/>} />
    <Route exact path='science' element={<News pageSize={18} key="science" country="in" category="science"/>} />
    <Route exact path='technology' element={<News pageSize={18} key="technology" country="in" category="technology"/>} />
    <Route path='*' element={<h3>Page Not Found</h3>}></Route>  {/*This will handle all the Bad request  */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <RouterProvider router={MyRouter} />

  </React.StrictMode>
)
