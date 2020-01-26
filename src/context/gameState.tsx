import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';
import {
  State,
  Player,
  Piece,
  Coordinates,
} from '../interfaces/context.interface';

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
      type: 'SET_COORDINATES',
      coordinates,
    });
  };

  const dispatchFunctions = {
    getBoard,
    setClickedCoordinates,
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