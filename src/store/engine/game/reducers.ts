import * as Types from './types';
import { combineReducers } from 'redux';

export const setPlayersByGameType = (
  gameType: Types.GameType,
  selectedPlayer?: Types.PlayerType
): Types.PlayerType[] => {
  switch (gameType) {
    case Types.SINGLE_PLAYER:
      return selectedPlayer ? [Types.PLAYER_AI, selectedPlayer] : [];
    case Types.LOCAL_MULTIPLAYER:
    case Types.ONLINE_MULTIPLAYER:
      return [Types.PLAYER_BLUE, Types.PLAYER_RED];
    default:
      return [];
  }
};

export const initialState: Types.PropertiesState = {
  endMethod: undefined,
  halfmoves: 0,
  history: [],
  isGameComplete: false,
  pauseGame: false,
  winner: undefined,
};

const initialPlayerState: Types.PlayerState = {
  currentPlayer: undefined,
  players: [],
  gameType: undefined,
};

export const playerReducer = (
  state = initialPlayerState,
  action: Types.PlayerActions
): Types.PlayerState => {
  switch (action.type) {
    case Types.SET_GAME_TYPE:
      return {
        ...state,
        gameType: action.gameType,
      };
    case Types.SET_PLAYERS:
      let players: Types.PlayerType[] = [];
      if (state.gameType) {
        players = setPlayersByGameType(state.gameType, action.player);
      }
      return {
        ...state,
        players: players,
      };
    case Types.SET_CURRENT_PLAYER:
      if (state.currentPlayer === undefined) {
        if (state.players[0] === Types.PLAYER_AI) {
          if (state.players[1] === action.firstPlayer) {
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
            currentPlayer: action.firstPlayer,
          };
        }
      }

      const indexOfLastPlayer = state.players.indexOf(state.currentPlayer);
      return {
        ...state,
        currentPlayer: state.players[1 - indexOfLastPlayer],
      };
    default:
      return state;
  }
};

export const propertiesReducer = (
  state = initialState,
  action: Types.PropertiesActions
): Types.PropertiesState => {
  switch (action.type) {
    case Types.INCREMENT_HALFMOVE:
      return {
        ...state,
        halfmoves: state.halfmoves + 1,
      };
    case Types.RESET_HALFMOVE:
      return {
        ...state,
        halfmoves: 0,
      };
    case Types.SET_PAUSE_GAME:
      return {
        ...state,
        pauseGame: !state.pauseGame,
      };
    case Types.ADD_TO_HISTORY:
      return {
        ...state,
        history: [...state.history, action.move],
      };
    case Types.SET_IS_GAME_COMPLETE:
      return {
        ...state,
        isGameComplete: true,
      };
    case Types.SET_WINNER_BY_END_METHOD:
      return {
        ...state,
        winner: action.winner,
        endMethod: action.endMethod,
      };
    default:
      return state;
  }
};

export const gameReducer = combineReducers({
  properties: propertiesReducer,
  player: playerReducer,
});
