import CardModel from '../interfaces/card.interface';
import {
  SET_CURRENT_CARD,
  SET_NEXT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
  MOVE_PIECE,
  SET_SELECTED_CELL,
  SET_HAS_GAME_FINISHED,
  SET_WINNER,
  SET_WIN_METHOD,
  CLEAR_GAME_STATE,
  SET_IS_CLEARED,
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
  currentPosition: Coordinate;
}

export interface Player {
  pieces: Piece[];
}

export interface CellData {
  id: number;
  piece: Piece | null;
  isValidMove: boolean;
  isEmpty: boolean;
}

interface BoardState {
  cells: CellData[];
}

export interface Coordinates extends Coordinate {
  id: number;
}

export interface PlayerHand {
  [key: string]: CardModel;
}

export interface State {
  board: BoardState;
  selectedCell: CellData | undefined;
  selectedCard: CardModel | undefined;
  currentPlayer: PlayerColor;
  firstPlayer: PlayerColor;
  validMoves: number[] | undefined;
  nextCard: CardModel;
  redHand: PlayerHand;
  blueHand: PlayerHand;
  hasGameFinished: boolean;
  winner: PlayerColor | undefined;
  winMethod: WinMethods | undefined;
  isCleared: boolean;
}
export interface GameContextProperties extends State {
  setSelectedCell: (cell: CellData) => void;
  setCurrentCard: (currentCard: CardModel) => void;
  setNextCard: (
    nextCard: CardModel,
    targetProperty: 'blueHand' | 'redHand',
    replacementCard: CardModel
  ) => void;
  setCurrentPlayer: (player: PlayerColor) => void;
  setValidMoves: (moves: number[]) => void;
  movePiece: (fromCell: CellData, toID: number) => void;
  setHasGameFinished: () => void;
  setWinner: (winner: PlayerColor) => void;
  setWinMethod: (winMethod: WinMethods) => void;
  clearGameState: () => void;
  setIsCleared: () => void;
}
interface SetSelectedCell {
  type: typeof SET_SELECTED_CELL;
  cell: CellData;
}

interface SetCurrentCard {
  type: typeof SET_CURRENT_CARD;
  currentCard: CardModel;
}

interface SetNextCard {
  type: typeof SET_NEXT_CARD;
  nextCard: CardModel;
  targetProperty: 'blueHand' | 'redHand';
  replacementCard: CardModel;
}

interface SetCurrentPlayer {
  type: typeof SET_CURRENT_PLAYER;
  player: PlayerColor;
}

interface SetValidMoves {
  type: typeof SET_VALID_MOVES;
  moves: number[];
}

interface SetHasGameFinished {
  type: typeof SET_HAS_GAME_FINISHED;
}

interface MovePiece {
  type: typeof MOVE_PIECE;
  fromCell: CellData;
  toID: number;
}

interface SetWinner {
  type: typeof SET_WINNER;
  winner: PlayerColor;
}

interface SetWinMethod {
  type: typeof SET_WIN_METHOD;
  winMethod: WinMethods;
}

interface ClearGameState {
  type: typeof CLEAR_GAME_STATE;
}

interface SetIsCleared {
  type: typeof SET_IS_CLEARED;
}

export type Actions =
  | SetSelectedCell
  | SetCurrentCard
  | SetNextCard
  | SetCurrentPlayer
  | SetValidMoves
  | MovePiece
  | SetHasGameFinished
  | SetWinner
  | SetWinMethod
  | ClearGameState
  | SetIsCleared;
