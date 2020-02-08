import React from 'react';
import MoveNotation from './MoveNotation';
import { HistoryList } from './_ModalStyles';

interface MoveHistoryModalProps {
  moveHistory: string[][];
}

const MoveHistoryModal: React.FC<MoveHistoryModalProps> = ({ moveHistory }) => {
  const createHistoryList = (): JSX.Element[] => {
    const history = [];
    for (let i = 0; i < moveHistory.length; i += 2) {
      history.push(
        <li key={i / 2 + 1}>
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

  return <HistoryList>{createHistoryList()}</HistoryList>;
};

export default React.memo(MoveHistoryModal, (prevProps, nextProps) => {
  return prevProps.moveHistory.length === nextProps.moveHistory.length;
});
