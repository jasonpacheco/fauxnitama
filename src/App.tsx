import React from 'react';
import BoardSetup from './components/BoardSetup/BoardSetup';
import useGameContext from './context/useGameContext';

const App: React.FC = () => {
  const { cardSet } = useGameContext();

  return (
    <>
      <BoardSetup cards={cardSet} firstPlayerColor={cardSet[4].stamp} />
    </>
  );
};

export default App;
