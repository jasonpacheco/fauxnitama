import {
  GameActions,
  GameState,
  SET_PLAYERS,
  SET_CURRENT_PLAYER,
  SET_GAME_TYPE,
  GameType,
  PlayerType,
  SINGLE_PLAYER,
  PLAYER_AI,
  LOCAL_MULTIPLAYER,
  PLAYER_BLUE,
  PLAYER_RED,
  ONLINE_MULTIPLAYER,
  INCREMENT_HALFMOVE,
  RESET_HALFMOVE,
  SET_PAUSE_GAME,
  ADD_TO_HISTORY,
  SET_IS_GAME_COMPLETE,
  SET_WINNER_BY_END_METHOD,
} from './types';

export const setPlayersByGameType = (
  gameType: GameType,
  selectedPlayer?: PlayerType
): PlayerType[] => {
  switch (gameType) {
    case SINGLE_PLAYER:
      return selectedPlayer ? [PLAYER_AI, selectedPlayer] : [];
    case LOCAL_MULTIPLAYER:
    case ONLINE_MULTIPLAYER:
      return [PLAYER_BLUE, PLAYER_RED];
    default:
      return [];
  }
};

export const initialState: GameState = {
  currentPlayer: undefined,
  endMethod: undefined,
  gameType: undefined,
  halfmoves: 0,
  history: [],
  isGameComplete: false,
  pauseGame: false,
  players: [],
  winner: undefined,
};

export const gameReducer = (
  state = initialState,
  action: GameActions
): GameState => {
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
      if (state.currentPlayer === undefined) {
        if (state.players[0] === PLAYER_AI) {
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
    case INCREMENT_HALFMOVE:
      return {
        ...state,
        halfmoves: state.halfmoves + 1,
      };
    case RESET_HALFMOVE:
      return {
        ...state,
        halfmoves: 0,
      };
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
    default:
      return state;
  }
};
