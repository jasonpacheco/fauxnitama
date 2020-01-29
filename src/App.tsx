import React, { useEffect, useState } from 'react';
import BoardSetup from './components/BoardSetup/BoardSetup';
import { generateCardSet } from './utils';
import useGameContext from './context/useGameContext';
import CardModel from './interfaces/card.interface';

const App: React.FC = () => {
  const { currentPlayer, setCurrentPlayer } = useGameContext();
  const [state, setState] = useState<{
    cards: CardModel[] | undefined;
    firstPlayerColor: 'Blue' | 'Red' | undefined;
  }>({
    cards: undefined,
    firstPlayerColor: undefined,
  });

  useEffect(() => {
    const cards = generateCardSet();
    const firstPlayerColor = cards[4].stamp;
    setState({
      cards,
      firstPlayerColor,
    });
    setCurrentPlayer('Blue'); // set with firstPlayerColor after testing
  }, [currentPlayer]);

  return state.cards === undefined || state.firstPlayerColor === undefined ? (
    <>Loading</>
  ) : (
    <>
      <BoardSetup
        cards={state.cards}
        firstPlayerColor={state.firstPlayerColor}
      />
    </>
  );
};

export default App;
