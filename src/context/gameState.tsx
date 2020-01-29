import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';
import { generateCardSet } from '../utils';

import { State, Coordinates, CellData } from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import {
  SET_COORDINATES,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
} from '../types';

const Opponent: CellData[] = [
  {
    id: 0,
    piece: { color: 'Red', type: 'Student', startPosition: { x: 0, y: 0 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 1,
    piece: { color: 'Red', type: 'Student', startPosition: { x: 0, y: 1 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 2,
    piece: { color: 'Red', type: 'Master', startPosition: { x: 0, y: 2 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 3,
    piece: { color: 'Red', type: 'Student', startPosition: { x: 0, y: 3 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 4,
    piece: { color: 'Red', type: 'Student', startPosition: { x: 0, y: 4 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
];

const Player: CellData[] = [
  {
    id: 20,
    piece: { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 0 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 21,
    piece: { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 1 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 22,
    piece: { color: 'Blue', type: 'Master', startPosition: { x: 4, y: 2 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 23,
    piece: { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 3 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 24,
    piece: { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 4 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
];

const EmptySpaceGenerator = (): CellData[] => {
  const cells = [];
  for (let i = 5; i <= 19; i++) {
    cells.push({
      id: i,
      piece: null,
      isValidMove: false,
      isEmpty: true,
      isBlue: false,
      isRed: false,
    });
  }
  return cells;
};

const cards = generateCardSet();

const initialState: State = {
  clickedCoordinates: undefined,
  selectedCard: undefined,
  currentPlayer: 'Blue',
  cardSet: cards,
  firstPlayer: cards[4].stamp,
  board: {
    cells: [...Opponent, ...EmptySpaceGenerator(), ...Player],
  },
};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getBoard = (): CellData[] => {
    return initialState.board.cells;
  };

  const setClickedCoordinates = (coordinates: Coordinates): void => {
    dispatch({
      type: SET_COORDINATES,
      coordinates,
    });
  };

  const setCurrentCard = (card: CardModel): void => {
    dispatch({
      type: SET_CURRENT_CARD,
      card,
    });
  };

  const setCurrentPlayer = (player: 'Blue' | 'Red'): void => {
    dispatch({
      type: SET_CURRENT_PLAYER,
      player,
    });
  };

  const dispatchFunctions = {
    getBoard,
    setClickedCoordinates,
    setCurrentCard,
    setCurrentPlayer,
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        ...dispatchFunctions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
