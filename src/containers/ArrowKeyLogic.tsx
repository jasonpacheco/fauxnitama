import React, { Fragment } from 'react';
import useKeyPress from '../interactive/useKeyPress';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store/engine';
import { onClickSquare } from '../store/engine/actions/eventActions';
import { PlayerType } from '../store/engine/types/gameTypes';
import { PiecePosition, PieceTuple } from '../store/engine/types/pieceTypes';

type ArrowKeyLogicProps = PropsFromRedux;

const ArrowKeyLogic: React.FC<ArrowKeyLogicProps> = ({
  currentPlayer,
  piecePositions,
  selectedPiece,
  onClickSquare,
  isGameComplete,
  pauseGame,
}) => {
  const getIndex = (
    direction: 'left' | 'right',
    currentIndex: number,
    positionsLength: number
  ): number =>
    direction === 'left'
      ? (((currentIndex - 1) % positionsLength) + positionsLength) %
        positionsLength
      : (currentIndex + 1) % positionsLength;

  const onPressUp = (direction: 'left' | 'right'): void => {
    if (pauseGame || isGameComplete) return;
    if (selectedPiece.length === 0) {
      const startID = piecePositions[currentPlayer][0][0];
      onClickSquare(startID);
    } else {
      const currentPlayerPositions = piecePositions[currentPlayer];
      const positionsLength = currentPlayerPositions.length;
      const currentIndex = currentPlayerPositions.findIndex(
        pieceTuple => pieceTuple[0] === selectedPiece[0]
      );
      const nextID =
        currentPlayerPositions[
          getIndex(direction, currentIndex, positionsLength)
        ][0];
      onClickSquare(nextID);
    }
  };

  useKeyPress('ArrowRight', () => onPressUp('right'));
  useKeyPress('ArrowLeft', () => onPressUp('left'));

  return <Fragment></Fragment>;
};

interface StateProps {
  currentPlayer: PlayerType | '';
  piecePositions: PiecePosition;
  selectedPiece: PieceTuple | [];
  isGameComplete: boolean;
  pauseGame: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
  const {
    gameReducer: {
      player: { currentPlayer },
      properties: { isGameComplete, pauseGame },
    },
    pieceReducer: { piecePositions, selectedPiece },
  } = state;
  return {
    currentPlayer,
    piecePositions,
    selectedPiece,
    isGameComplete,
    pauseGame,
  };
};
const connector = connect(mapStateToProps, { onClickSquare });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ArrowKeyLogic);
