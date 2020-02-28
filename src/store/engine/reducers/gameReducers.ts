import { combineReducers } from 'redux';
import { setPlayersByGameType } from '../../utils';
import {
  PlayerState,
  PlayerActions,
  SET_GAME_TYPE,
  SET_PLAYERS,
  PlayerType,
  SET_CURRENT_PLAYER,
  PLAYER_AI,
  PropertiesState,
  PropertiesActions,
  SET_PAUSE_GAME,
  ADD_TO_HISTORY,
  SET_IS_GAME_COMPLETE,
  SET_WINNER_BY_END_METHOD,
} from '../types/gameTypes';
import {
  OnClickSquareAction,
  ON_CLICK_SQUARE,
  OnGameInitializationAction,
  ON_GAME_INITIALIZATION,
} from '../types/eventTypes';
import {
  OnClickButtonPause,
  ON_CLICK_BUTTON_PASS,
  ON_CLICK_BUTTON_PAUSE,
  OnClickButtonYesRestart,
  ON_CLICK_BUTTON_YES_RESTART,
  OnClickButtonPass,
} from '../types/buttonTypes';

const initialPlayerState: PlayerState = {
  currentPlayer: '',
  players: [],
  gameType: '',
  colors: [],
};

export const playerReducer = (
  state = initialPlayerState,
  action:
    | PlayerActions
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
    case ON_GAME_INITIALIZATION:
      const index = action.players.indexOf(action.firstPlayer);
      return {
        ...state,
        gameType: action.gameType,
        players: action.players,
        currentPlayer: index === -1 ? PLAYER_AI : action.firstPlayer,
        colors: action.colors,
      };
    case SET_GAME_TYPE:
      return {
        ...state,
        gameType: action.gameType,
      };
    case SET_PLAYERS:
      let players: PlayerType[] = [];
      if (state.gameType) {
        players = setPlayersByGameType(state.gameType, action.player);
      }
      return {
        ...state,
        players: players,
      };
    case SET_CURRENT_PLAYER:
      const { firstPlayer } = action;
      const { currentPlayer } = state;
      if (!currentPlayer) {
        if (state.players[0] === PLAYER_AI) {
          if (state.players[1] === firstPlayer) {
            return {
              ...state,
              currentPlayer: state.players[1],
            };
          } else {
            return {
              ...state,
              currentPlayer: state.players[0],
            };
          }
        } else {
          return {
            ...state,
            currentPlayer: firstPlayer ?? '',
          };
        }
      }

      const indexOfLastPlayer = state.players.indexOf(currentPlayer);
      return {
        ...state,
        currentPlayer: state.players[1 - indexOfLastPlayer],
      };
    case ON_CLICK_SQUARE:
      return {
        ...state,
        currentPlayer: action.opponent,
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
    | PropertiesActions
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
      };
    case ON_CLICK_BUTTON_PAUSE:
      return {
        ...state,
        pauseGame: !state.pauseGame,
      };
    case ON_CLICK_BUTTON_YES_RESTART:
      return initialState;
    case SET_PAUSE_GAME:
      return {
        ...state,
        pauseGame: !state.pauseGame,
      };
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: [...state.history, action.move],
      };
    case SET_IS_GAME_COMPLETE:
      return {
        ...state,
        isGameComplete: true,
      };
    case SET_WINNER_BY_END_METHOD:
      return {
        ...state,
        winner: action.winner,
        endMethod: action.endMethod,
      };
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
