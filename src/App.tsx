import React from 'react';
import BoardSetup from './components/BoardSetup/BoardSetup';
import GameState from './context/gameState';
// import Piece from './components/Piece/Piece';
// import Card from './components/Card/Card';

const App: React.FC = () => {
  return (
    <GameState>
      <BoardSetup />
    </GameState>
  );
};

export default App;
