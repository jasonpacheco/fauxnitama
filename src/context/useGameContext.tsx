import React from 'react';
import gameContext from './gameContext';
import { GameContextProperties } from '../interfaces/context.interface';

const useGameContext = (): GameContextProperties => {
  const context = React.useContext(gameContext);

  if (context === undefined) {
    throw new Error('useGameContext is undefined');
  }

  return context;
};

export default useGameContext;
