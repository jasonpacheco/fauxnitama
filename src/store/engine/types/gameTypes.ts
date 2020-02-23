export const SINGLE_PLAYER = 'SINGLE_PLAYER';
export const LOCAL_MULTIPLAYER = 'LOCAL_MULTIPLAYER';
export const ONLINE_MULTIPLAYER = 'ONLINE_MULTIPLAYER';
export const SET_GAME_TYPE = 'SET_GAME_TYPE';
export const SET_PLAYERS = 'SET_PLAYERS';
export const PLAYER_BLUE = 'PLAYER_BLUE';
export const PLAYER_RED = 'PLAYER_RED';
export const PLAYER_AI = 'PLAYER_AI';
export const CAPTURE_MASTER = 'CAPTURE_MASTER';
export const CAPTURE_TEMPLE = 'CAPTURE_TEMPLE';
export const DRAW = 'DRAW';
export const SET_PAUSE_GAME = 'SET_PAUSE_GAME';
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const SET_IS_GAME_COMPLETE = 'SET_IS_GAME_COMPLETE';
export const SET_WINNER_BY_END_METHOD = 'SET_WINNER_BY_END_METHOD';
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

export type PlayerType =
  | typeof PLAYER_AI
  | typeof PLAYER_BLUE
  | typeof PLAYER_RED;

export type EndMethod =
  | typeof CAPTURE_MASTER
  | typeof CAPTURE_TEMPLE
  | typeof DRAW;

export type GameType =
  | typeof SINGLE_PLAYER
  | typeof LOCAL_MULTIPLAYER
  | typeof ONLINE_MULTIPLAYER;

export interface PropertiesState {
  endMethod: EndMethod | '';
  history: string[][];
  isGameComplete: boolean;
  pauseGame: boolean;
  winner: PlayerType | '';
}

export interface PlayerState {
  currentPlayer: PlayerType | '';
  players: PlayerType[];
  gameType: GameType | '';
}

interface SetPlayers {
  type: typeof SET_PLAYERS;
  player?: typeof PLAYER_BLUE | typeof PLAYER_RED;
}

interface SetCurrentPlayer {
  type: typeof SET_CURRENT_PLAYER;
  firstPlayer?: typeof PLAYER_BLUE | typeof PLAYER_RED;
}

interface SetGameType {
  type: typeof SET_GAME_TYPE;
  gameType: GameType;
}

interface SetPauseGame {
  type: typeof SET_PAUSE_GAME;
}

interface AddToHistory {
  type: typeof ADD_TO_HISTORY;
  move: string[];
}

interface SetIsGameComplete {
  type: typeof SET_IS_GAME_COMPLETE;
}

interface SetWinnerByEndMethod {
  type: typeof SET_WINNER_BY_END_METHOD;
  winner: PlayerType | '';
  endMethod: EndMethod;
}

export type PropertiesActions =
  | AddToHistory
  | SetPauseGame
  | SetIsGameComplete
  | SetWinnerByEndMethod;

export type PlayerActions = SetPlayers | SetCurrentPlayer | SetGameType;

export type GameActions = PropertiesActions | PlayerActions;
