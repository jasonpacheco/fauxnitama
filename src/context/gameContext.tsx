import { createContext } from 'react';
import { GameContextProperties } from '../interfaces/context.interface';

const gameContext = createContext<GameContextProperties | undefined>(undefined);

export default gameContext;
