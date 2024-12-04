import './App.css';
import Timer from './components/Timer';
import Typewriter from './components/Typewriter';
import { useState } from 'react';
// import { useEffect } from 'react';

const INITIAL_TIME = 30;

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const handleStart = () => {
    if (!hasStarted){
      setHasStarted(true);
    }
  }
  const handleEnd = () => {
    if (!hasEnded) {
      setHasEnded(true);
    }
  }

  return (
    <div className="container-xl mt-5 d-flex flex-column align-items-center">
      <h1> Franco Typing </h1>

      <div className="container mt-5 d-flex flex-row align-items-center">
        <div className="container mt-5 d-flex flex-row justify-content-center">
          <Timer hasStarted={hasStarted} initialTime={INITIAL_TIME} notifyEnd={handleEnd}/>
          <Typewriter hasEnded={hasEnded} notifyStart={handleStart}/>
        </div> 
      </div>

    </div>
  );

}

export default App;