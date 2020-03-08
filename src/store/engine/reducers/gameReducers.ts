import { combineReducers } from 'redux';

import {
  ON_CLICK_BUTTON_PASS,
  ON_CLICK_BUTTON_PAUSE,
  ON_CLICK_BUTTON_YES_RESTART,
  OnClickButtonPass,
  OnClickButtonPause,
  OnClickButtonYesRestart,
} from '../types/buttonTypes';
import {
  ON_CLICK_SQUARE,
  ON_GAME_INITIALIZATION,
  OnClickSquareAction,
  OnGameInitializationAction,
} from '../types/eventTypes';
import { PLAYER_AI, PlayerState, PropertiesState } from '../types/gameTypes';

const initialPlayerState: PlayerState = {
  colors: [],
  currentPlayer: '',
  gameType: '',
  players: [],
};

export const playerReducer = (
  state = initialPlayerState,
  action:
    | OnClickSquareAction
    | OnGameInitializationAction
    | OnClickButtonYesRestart
    | OnClickButtonPass
): PlayerState => {
  switch (action.type) {
    case ON_CLICK_BUTTON_PASS:
      return {
        ...state,
        currentPlayer: action.currentPlayer,
      };

    case ON_CLICK_BUTTON_YES_RESTART:
      return {
        ...state,
        currentPlayer: action.currentPlayer,
      };

    case ON_CLICK_SQUARE:
      return {
        ...state,
        currentPlayer: action.opponent,
      };

    case ON_GAME_INITIALIZATION:
      const index = action.players.indexOf(action.firstPlayer);
      return {
        ...state,
        gameType: action.gameType,
        players: action.players,
        currentPlayer: index === -1 ? PLAYER_AI : action.firstPlayer,
        colors: action.colors,
      };

    default:
      return state;
  }
};

export const initialState: PropertiesState = {
  endMethod: '',
  history: [],
  isGameComplete: false,
  pauseGame: false,
  winner: '',
};

export const propertiesReducer = (
  state = initialState,
  action:
    | OnClickSquareAction
    | OnClickButtonPause
    | OnClickButtonYesRestart
    | OnClickButtonPass
): PropertiesState => {
  switch (action.type) {
    case ON_CLICK_BUTTON_PASS:
      return {
        ...state,
        history: [...state.history, action.move],
        endMethod: action.endMethod,
        isGameComplete: action.isGameComplete,
      };

    case ON_CLICK_BUTTON_PAUSE:
      return {
        ...state,
        pauseGame: !state.pauseGame,
      };

    case ON_CLICK_BUTTON_YES_RESTART:
      return initialState;

    case ON_CLICK_SQUARE:
      return {
        ...state,
        winner: action.winner,
        endMethod: action.endMethod,
        isGameComplete: action.isGameComplete,
        history: [...state.history, action.move],
      };
    default:
      return state;
  }
};

export const gameReducer = combineReducers({
  properties: propertiesReducer,
  player: playerReducer,
});
