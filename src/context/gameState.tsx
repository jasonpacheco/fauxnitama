import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';
import { generateCardSet } from '../utils';

import {
  State,
  Player,
  Piece,
  Coordinates,
} from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import {
  SET_COORDINATES,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
} from '../types';

const Opponent: Player = {
  pieces: [
    { color: 'Red', type: 'Student', startPosition: { x: 0, y: 0 } },
    { color: 'Red', type: 'Student', startPosition: { x: 0, y: 1 } },
    { color: 'Red', type: 'Master', startPosition: { x: 0, y: 2 } },
    { color: 'Red', type: 'Student', startPosition: { x: 0, y: 3 } },
    { color: 'Red', type: 'Student', startPosition: { x: 0, y: 4 } },
  ],
};

const User: Player = {
  pieces: [
    { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 0 } },
    { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 1 } },
    { color: 'Blue', type: 'Master', startPosition: { x: 4, y: 2 } },
    { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 3 } },
    { color: 'Blue', type: 'Student', startPosition: { x: 4, y: 4 } },
  ],
};

const initialState: State = {
  clickedCoordinates: undefined,
  selectedCard: undefined,
  currentPlayer: undefined,
  cardSet: generateCardSet(),
  board: {
    layout: [
      Opponent.pieces,
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      User.pieces,
    ],
  },
};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getBoard = (): (Piece | null)[][] => {
    return initialState.board.layout;
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
