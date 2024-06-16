// this app.js is considered as the main component which import the other components its totally up to you want to make as main or not.


import logo from './logo.svg';
import './App.css';
import Navbars  from './components/Navbar';

function App() {
  return (
   <>
   {/* 1. this is the navbar component imported */}
   {/* 2. we can send the our variable with predefined values and which is known as props */}
    <Navbars title={4} home="Home Store" />  
    
    {/*3. when you don't send the variable from here */}
    {/* <Navbars />  */}
    <h1> hello welcome</h1>
   </>
   
  );
}

export default App;
