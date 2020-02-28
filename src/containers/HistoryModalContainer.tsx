import React, { useState } from 'react';
import MoveNotation from '../components/Modal/MoveNotation';
import {
  DisplayFEN,
  HistoryList,
} from '../components/Modal/styles/MoveHistoryModal';
import { Button } from '../components/Modal/styles';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store/engine';
import { onClickButtonFEN } from '../store/engine/actions/buttonActions';

type HistoryModalContainerProps = StateProps & PropsFromRedux;

const HistoryModalContainer: React.FC<HistoryModalContainerProps> = ({
  history,
  halfmoves,
  onClickButtonFEN,
}) => {
  const [FEN, setFEN] = useState<string>('');

  const createHistoryList = (): JSX.Element[] => {
    const historyList = [];
    for (let i = 0; i < history.length; i += 2) {
      historyList.push(
        <li key={i / 2}>
          <p>{`${i / 2 + 1}. `}</p>
          <p>
            <MoveNotation tokens={history[i]} />
          </p>
          <p>
            <MoveNotation tokens={history[i + 1]} />
          </p>
        </li>
      );
    }
    return historyList;
  };

  const handleFENClick = (): void => {
    const currentFEN = onClickButtonFEN();
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

interface StateProps {
  halfmoves: number;
  history: string[][];
}

const mapStateToProps = (state: AppState): StateProps => {
  const { history } = state.gameReducer.properties;
  const { halfmoves } = state.pieceReducer;

  return {
    halfmoves,
    history,
  };
};

const connector = connect(mapStateToProps, {
  onClickButtonFEN,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HistoryModalContainer);
