import React from 'react';
import BoardSetup from './components/BoardSetup/BoardSetup';
import useGameContext from './context/useGameContext';

const App: React.FC = () => {
  const { cardSet, firstPlayer } = useGameContext();

  return (
    <>
      <BoardSetup cards={cardSet} firstPlayerColor={firstPlayer} />
    </>
  );
};

export default App;
