// this app.js is considered as the main component which import the other components its totally up to you want to make as main or not.


import logo from './logo.svg';
import './App.css';
import Navbars  from './components/Navbar';
import Inputform from './components/InputForm';
import UserCard from './components/UserCard';
import para from './para.module.css'  // module css imported



function App() {
  const colorChange = true;
  return (
   <>
   {/* 1. this is the navbar component imported */}
   {/* 2. we can send the our variable with predefined values and which is known as props */}
    <Navbars title="Starlink" home="Home Store" />

    {/*3. when you don't send the variable from here */}
    {/* <Navbars />  */}

    <div className="container my-3"></div>
    <Inputform heading="This is your Form kundli"/>

    <h1 className='head1'> hello welcome</h1>
    <br /> <br />

    <h3> User details </h3>

{/* in the below code - it covers two important topics
    (A) passing the jsx as props
    (B) passing content or jsx in component body during calling which can be accessed only by props.children inside the children */}
    <UserCard name="Bob" age={30} greetings={
      <>
      <p >Hello Bob ! Have wonderful day</p>
      </>
    } >
    <button  style={{backgroundColor : 'blue', fontSize : "20px", color: "white"}}>Contacts</button> 
    </UserCard>  {/* we called the component with different types of props along with one props passed as JSX and passing something in their body  will it work? No for accessing this you should use the children in component for accessing */}
    
    <button style={{
      color: "white",
      backgroundColor : `${colorChange ? "black" : "red"}`
    }}> Btn color chg from red to black if it is true</button>
   
    <h1>2. Css Modules</h1>
    <div>
      <p className={`${para.paragraph}  ${para.shadow}`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, laboriosam!</p>
    </div>

    <div>

    </div>
   </>
   
  );
}

export default App;
