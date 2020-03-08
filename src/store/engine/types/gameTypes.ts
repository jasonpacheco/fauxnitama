export const SINGLE_PLAYER = 'SINGLE_PLAYER';
export const LOCAL_MULTIPLAYER = 'LOCAL_MULTIPLAYER';
export const ONLINE_MULTIPLAYER = 'ONLINE_MULTIPLAYER';
export const PLAYER_BLUE = 'PLAYER_BLUE';
export const PLAYER_RED = 'PLAYER_RED';
export const BLUE = 'BLUE';
export const RED = 'RED';
export const PLAYER_AI = 'PLAYER_AI';
export const CAPTURE_MASTER = 'CAPTURE_MASTER';
export const CAPTURE_TEMPLE = 'CAPTURE_TEMPLE';
export const DRAW = 'DRAW';

export type Colors = typeof BLUE | typeof RED;

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
  colors: Colors[];
  currentPlayer: PlayerType | '';
  gameType: GameType | '';
  players: PlayerType[];
}
