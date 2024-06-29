import { useState } from 'react'
import './App.css'
import { IoLogoAndroid } from "react-icons/io";
import { AlertComponent } from './alert';

export function App() {
  const [isOn, setBtn] = useState(false);
  const [alertDetails, setShowAlert] = useState({});
  const [alertCheck, setAlert] = useState(false);

  function alertTrigger() {
    setAlert(true);
    setShowAlert({
      msg: "Nice, you triggered this alert message!",
      type: "success"
    });
  }

  function closeAlert() {
    setAlert(false);
  }

  function toggleFunc() {
    setBtn(!isOn);
  }

  return (
    <>
      <h1>Click the toggle Button Below and see the magic</h1>
      <div className='Container'>
        <div className='outerBox' onClick={toggleFunc} style={{ backgroundColor: isOn ? 'green' : 'grey' }}>
          <div className={`innerBox ${isOn ? 'On' : 'Off'}`}>
            <div className='toggleBtn'>{`${isOn ? 'On' : 'Off'}`}</div>
          </div>
        </div>
        <IoLogoAndroid size={100} style={{ color: 'green' }} />    {/*logo */}
      </div>
      <div>
        <h2>Alert</h2>
        <br />
        <div id="liveAlertPlaceholder"></div>
        <button type="button" className="btn btn-primary" onClick={alertTrigger}>Show live alert</button>
        {alertCheck && <AlertComponent alertdata={alertDetails} closeAlert={closeAlert} />}
      </div>
    </>
  );
}

export default App;


