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
  SET_VALID_MOVES,
} from '../types';

import moveChecker from '../interactive/moveChecker';

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
  validMoves: undefined,
  board: {
    cells: [...Opponent, ...EmptySpaceGenerator(), ...Player],
  },
};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getBoard = (): CellData[] => {
    return state.board.cells;
  };

  const setClickedCoordinates = (coordinates: Coordinates): void => {
    dispatch({
      type: SET_COORDINATES,
      coordinates,
    });
  };

  const setValidMoves = (moves: number[]): void => {
    dispatch({
      type: SET_VALID_MOVES,
      moves,
    });
  };

  const setCurrentCard = (card: CardModel): void => {
    dispatch({
      type: SET_CURRENT_CARD,
      card,
    });

    if (state.clickedCoordinates) {
      const validMoves = moveChecker(
        state.clickedCoordinates,
        card.moves,
        getBoard()
      );
      console.log('I Ran');
      setValidMoves(validMoves);
    }
  };

  const setCurrentPlayer = (player: 'Blue' | 'Red'): void => {
    dispatch({
      type: SET_CURRENT_PLAYER,
      player,
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        getBoard,
        setClickedCoordinates,
        setCurrentCard,
        setCurrentPlayer,
        setValidMoves,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
