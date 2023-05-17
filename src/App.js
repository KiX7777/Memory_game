import './App.css';
import Players from './components/Players';
import { GameOver } from './components/UI/GameOver';
import Scoreboard from './components/UI/Scoreboard';
import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const players = useSelector((state) => state.player.players);
  const msg = useSelector((state) => state.player.msg);
  const loading = useSelector((state) => state.UI.isLoading);

  return (
    <div className='App'>
      {msg && <GameOver />}
      {!loading && players.length > 0 && <Scoreboard />}
      <Players />
    </div>
  );
}

export default App;
