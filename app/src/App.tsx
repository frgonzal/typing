import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="container-xl mt-5 d-flex flex-column align-items-center">
      <h1> Typing </h1>
      <Game />
    </div>
  );

}

export default App;