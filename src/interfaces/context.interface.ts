import CardModel from '../interfaces/card.interface';
import {
  ADD_MOVE_HISTORY,
  CLEAR_GAME_STATE,
  MOVE_PIECE,
  SET_CLICKED_CARD,
  SET_CLICKED_PIECE,
  SET_CURRENT_PLAYER,
  SET_HAS_GAME_FINISHED,
  SET_IS_CLEARED,
  SET_NEXT_CARD,
  SET_PAUSE,
  SET_VALID_MOVES,
  SET_WIN_METHOD,
  SET_WINNER,
} from '../types';

export type Coordinate = {
  x: number;
  y: number;
};

export type PlayerColor = 'Blue' | 'Red';
export type PlayerType = 'Master' | 'Student';
export type WinMethods = 'master-check' | 'temple-check';

export interface Piece {
  color: PlayerColor;
  type: PlayerType;
  currentPositionID: number;
}

export interface Player {
  pieces: Piece[];
}

export interface SquareData {
  id: number;
  piece: Piece | undefined;
}

export interface PlayerHand {
  [key: string]: CardModel;
}

export interface State {
  board: SquareData[];
  clickedCard: CardModel | undefined;
  clickedPiece: Piece | undefined;
  currentPlayer: PlayerColor;
  isCleared: boolean;
  handBlue: PlayerHand;
  handRed: PlayerHand;
  hasGameFinished: boolean;
  moveHistory: string[][];
  nextCard: CardModel;
  pauseGame: boolean;
  validMoves: number[];
  winMethod: WinMethods | undefined;
  winner: PlayerColor | undefined;
}

export interface GameContextProperties extends State {
  addMoveHistory: (notation: string[]) => void;
  clearGameState: () => void;
  getCurrentFEN: () => string;
  movePiece: (fromPiece: Piece, toID: number) => void;
  setClickedCard: (clickedCard: CardModel) => void;
  setClickedPiece: (clickedPiece: Piece) => void;
  setCurrentPlayer: (player: PlayerColor) => void;
  setHasGameFinished: () => void;
  setIsCleared: () => void;
  setNextCard: (
    nextCard: CardModel,
    targetProperty: 'handBlue' | 'handRed',
    replacementCard: CardModel
  ) => void;
  setPassTurn: () => void;
  setPauseGame: (pause: boolean) => void;
  setValidMoves: (piece: Piece | undefined) => void;
  setWinMethod: (winMethod: WinMethods) => void;
  setWinner: (winner: PlayerColor) => void;
}

interface AddMoveHistory {
  type: typeof ADD_MOVE_HISTORY;
  notation: string[];
}

interface ClearGameState {
  type: typeof CLEAR_GAME_STATE;
}

interface MovePiece {
  type: typeof MOVE_PIECE;
  fromPiece: Piece;
  toID: number;
}

interface SetClickedCard {
  type: typeof SET_CLICKED_CARD;
  clickedCard: CardModel;
}

interface SetClickedPiece {
  type: typeof SET_CLICKED_PIECE;
  clickedPiece: Piece;
}

interface SetCurrentPlayer {
  type: typeof SET_CURRENT_PLAYER;
  player: PlayerColor;
}

interface SetHasGameFinished {
  type: typeof SET_HAS_GAME_FINISHED;
}

interface SetIsCleared {
  type: typeof SET_IS_CLEARED;
}

interface SetNextCard {
  type: typeof SET_NEXT_CARD;
  nextCard: CardModel;
  targetProperty: 'handBlue' | 'handRed';
  replacementCard: CardModel;
}

interface SetPauseGame {
  type: typeof SET_PAUSE;
  pause: boolean;
}

interface SetValidMoves {
  type: typeof SET_VALID_MOVES;
  piece: Piece | undefined;
}

interface SetWinMethod {
  type: typeof SET_WIN_METHOD;
  winMethod: WinMethods;
}

interface SetWinner {
  type: typeof SET_WINNER;
  winner: PlayerColor;
}

export type Actions =
  | AddMoveHistory
  | ClearGameState
  | MovePiece
  | SetClickedCard
  | SetClickedPiece
  | SetCurrentPlayer
  | SetHasGameFinished
  | SetIsCleared
  | SetNextCard
  | SetPauseGame
  | SetValidMoves
  | SetWinMethod
  | SetWinner;
