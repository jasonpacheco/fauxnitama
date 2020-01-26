import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';
import { State } from '../interfaces/context.interface';

const initialState: State = {};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const dispatchFunctions = {};

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
