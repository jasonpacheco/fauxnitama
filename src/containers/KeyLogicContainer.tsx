import React, { Fragment, useState } from 'react';
import useKeyPress from '../interactive/useKeyPress';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store/engine';
import {
  onClickSquare,
  onClickCard,
} from '../store/engine/actions/eventActions';
import { PlayerType } from '../store/engine/types/gameTypes';
import { PiecePosition, PieceTuple } from '../store/engine/types/pieceTypes';
import { getPlayerCards } from '../store/utils';
import { CardName } from '../store/engine/types/cardTypes';
import { gridLocationToID, FunctionsObject } from '../utils';
import { onClickButtonPause } from '../store/engine/actions/buttonActions';

type KeyLogicContainerProps = PropsFromRedux;

const KeyLogicContainer: React.FC<KeyLogicContainerProps> = ({
  currentPlayer,
  piecePositions,
  selectedPiece,
  onClickSquare,
  isGameComplete,
  pauseGame,
  currentCards,
  onClickCard,
  validMoves,
  onClickButtonPause,
}) => {
  const [pressed, setPressed] = useState('');
  const letters = new Set(['a', 'b', 'c', 'd', 'e']);
  const numbers = new Set(['1', '2', '3', '4', '5']);

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
    if (pressed) setPressed('');
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

  const onPressUpForCard = (index: number): void => {
    onClickCard(currentCards[index]);
  };

  const onPressGrid = (ch: string): void => {
    if (selectedPiece.length === 0) return;
    if (pressed === '' && letters.has(ch)) {
      setPressed(ch);
    } else if (pressed === '' && numbers.has(ch)) {
      return;
    } else if (letters.has(ch)) {
      if (ch === pressed) return;
      setPressed(ch);
    } else {
      const combined = pressed + ch;
      const id = gridLocationToID(combined);
      if (validMoves.includes(id)) {
        onClickSquare(id);
      }
    }
  };

  const functions: FunctionsObject = {
    ArrowRight: (): void => onPressUp('right'),
    ArrowLeft: (): void => onPressUp('left'),
    a: (): void => onPressGrid('a'),
    b: (): void => onPressGrid('b'),
    c: (): void => onPressGrid('c'),
    d: (): void => onPressGrid('d'),
    e: (): void => onPressGrid('e'),
    '1': (): void => {
      if (pressed) {
        onPressGrid('1');
      }
      onPressUpForCard(0);
    },
    '2': (): void => {
      if (pressed) {
        onPressGrid('2');
      }
      onPressUpForCard(1);
    },
    '3': (): void => onPressGrid('3'),
    '4': (): void => onPressGrid('4'),
    '5': (): void => onPressGrid('5'),
    ' ': (): void => {
      onClickButtonPause();
    },
  };

  useKeyPress(undefined, undefined, functions);

  return <Fragment></Fragment>;
};

interface StateProps {
  currentPlayer: PlayerType | '';
  piecePositions: PiecePosition;
  selectedPiece: PieceTuple | [];
  isGameComplete: boolean;
  pauseGame: boolean;
  currentCards: CardName[];
  validMoves: number[];
}

const mapStateToProps = (state: AppState): StateProps => {
  const {
    cardReducer: { cards },
    gameReducer: {
      player: { currentPlayer, players },
      properties: { isGameComplete, pauseGame },
    },
    pieceReducer: { piecePositions, selectedPiece, validMoves },
  } = state;
  const currentCards = getPlayerCards(
    cards,
    players,
    currentPlayer as PlayerType
  );
  return {
    currentPlayer,
    piecePositions,
    selectedPiece,
    isGameComplete,
    pauseGame,
    currentCards,
    validMoves,
  };
};
const connector = connect(mapStateToProps, {
  onClickSquare,
  onClickCard,
  onClickButtonPause,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(KeyLogicContainer);
