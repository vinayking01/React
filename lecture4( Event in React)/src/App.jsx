import './App.css'
import { handleButtonClick } from './events'
import MyButton from './Button5';
import EventPropagationExample from './eventPropogation';

function handleButtonClick2() {
  console.log(Event)
  alert("Hey I am onClick Event 2");
}

const handleButtonClick3 = (name,event)=> {
  console.log(name,event)
  alert("Hey I am onClick Event 3");
}

// const handleButtonClick4 = (name)=> {
//   console.log(`Hey ${name}, Welcome`);
// };

const handleButtonClick4 = (event) => {
  console.log(event);
  console.log(event.target);
  alert("Hey I am onClick Event");
};

function Click_btn()
{
  console.log("clicked");
  alert("Hey , You increased by 1 again")
}

function App() {

  return (
    <>
    <h1>This is the React + vite project</h1>
    <br />
    <h1> event handling</h1>
    <button onClick={handleButtonClick}>Click Me 1</button><br /> {/* Button with event handler assigned directly <div className=""></div> Remember how we haven't called this function,In React if you call this function here  then it will run without even clicking. You just need to pass reference and not call here. In this case, the event is automatically passed to the handleButtonClick4 function when the button is clicked. */}
    <button onClick={handleButtonClick2}>Click Me 2</button><br /> {/* Button with event handler assigned directly */}
    <button onClick={()=> handleButtonClick3("vinay")}>Click Me 3</button><br />  {/*Passing Arguments to Event Handlers */}  
    <button onClick={(event) => handleButtonClick4(event)}>click Me 4 </button>  {/*Button with inline arrow function passing argument , If you're using an arrow function, you typically pass the event when doing some additional logic inside the arrow function */}
    
    {/* passing event as props */}
    <div>
      <h2>Events passed as props</h2>
      <MyButton YourBtn={Click_btn} btn_number={5}/>
    </div>
    
    <div>
    <h1>Event Propogation </h1>
    <EventPropagationExample />
    </div>
    </>
  )
} 

export default App


