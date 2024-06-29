import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import { Products } from './pages/product.jsx'
import { ProductDetails } from './pages/productdetails.jsx'
import { ContactUs } from './component/contact_us.jsx'
import { Address } from './component/Address.jsx'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const MyRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} > {/* '/' This is the starting point of the your routing  */}
      <Route index element={<Home />} />  {/* Either you can use / or 'index' - both means here that first page during the starting of the routes wll always starts from here */}
      <Route path='products' element={<Products />}>
        <Route path=':id' element={<ProductDetails />}></Route>   {/* This is for the Dynamic routing :id act as params which changes */}
      </Route>
      <Route path="contact" element={<Contact />}>   {/* Nested Routes */}
        <Route path='contact-us' element={<ContactUs />}></Route>
        <Route path='Address' element={<Address />}></Route>
      </Route>
      <Route path="about" element={<About />} />
      <Route path='*' element={<h3>Page Not Found</h3>}></Route>  {/*This will handle all the Bad request  */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <createBrowserRouter>
      <RouterProvider router={MyRouter} />
    </createBrowserRouter>
  </React.StrictMode>
)
