import './App.css';
import Timer from './components/Timer';
import Typewriter from './components/Typewriter';
import { useState } from 'react';
// import { useEffect } from 'react';

function App() {
  const stopTimer = () => {
    console.log("Timer stopped");
  }

  const [hasStarted, setHasStarted] = useState(false);
  const HandleClick = () => {
    setHasStarted(true);
  }

  return (
    <div className="container-xl mt-4 d-flex flex-column align-items-center">
      <h1> Franco Typing </h1>
      <div className="container mt-4 d-flex flex-row justify-content-center">
        <Timer hasStarted={hasStarted} stopTimer={stopTimer}/>
        <Typewriter onClick={HandleClick}/>
      </div> 
    </div>
  );

}

export default App;