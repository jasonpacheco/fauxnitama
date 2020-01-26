import React from 'react';
import Board from './components/Board/Board';
import GameState from './context/gameState';
// import Piece from './components/Piece/Piece';
// import Card from './components/Card/Card';

const App: React.FC = () => {
  return (
    <GameState>
      <Board />
    </GameState>
  );
};

export default App;
