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
import { OnClickSquareAction, ON_CLICK_SQUARE } from '../types/eventTypes';

const initialPlayerState: PlayerState = {
  currentPlayer: '',
  players: [],
  gameType: '',
};

export const playerReducer = (
  state = initialPlayerState,
  action: PlayerActions | OnClickSquareAction
): PlayerState => {
  switch (action.type) {
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
  action: PropertiesActions | OnClickSquareAction
): PropertiesState => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};

export const gameReducer = combineReducers({
  properties: propertiesReducer,
  player: playerReducer,
});
