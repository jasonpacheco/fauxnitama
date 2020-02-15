import React, { useState } from 'react';
import MoveNotation from './MoveNotation';
import { DisplayFEN, HistoryList } from './styles/MoveHistoryModal';
import { Button } from './styles';
import useGameContext from '../../context/useGameContext';

const MoveHistoryModal: React.FC = () => {
  const { getCurrentFEN, halfmoves, moveHistory } = useGameContext();
  const [FEN, setFEN] = useState('');

  const createHistoryList = (): JSX.Element[] => {
    const history = [];
    for (let i = 0; i < moveHistory.length; i += 2) {
      history.push(
        <li key={i / 2}>
          <p>{`${i / 2 + 1}. `}</p>
          <p>
            <MoveNotation tokens={moveHistory[i]} />
          </p>
          <p>
            <MoveNotation tokens={moveHistory[i + 1]} />
          </p>
        </li>
      );
    }
    return history;
  };

  const handleFENClick = (): void => {
    const currentFEN = getCurrentFEN();
    setFEN(currentFEN);
  };

  return (
    <div>
      <Button onClick={(): void => handleFENClick()}>Get current FEN</Button>
      <br />
      <DisplayFEN>FEN: {FEN}</DisplayFEN>
      <br />
      <span>Halfmove count: {halfmoves}</span>
      <h4>Move History</h4>
      <HistoryList>{createHistoryList()}</HistoryList>
    </div>
  );
};

export default MoveHistoryModal;
