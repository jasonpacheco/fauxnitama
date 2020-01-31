import CardModel from '../interfaces/card.interface';
import {
  SET_CURRENT_CARD,
  SET_NEXT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
  MOVE_PIECE,
  SET_SELECTED_CELL,
  SET_HAS_GAME_FINISHED,
} from '../types';

export type Coordinate = {
  x: number;
  y: number;
};

export interface Piece {
  color: 'Blue' | 'Red';
  type: 'Student' | 'Master';
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
  isBlue: boolean;
  isRed: boolean;
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
  currentPlayer: 'Blue' | 'Red';
  cardSet: CardModel[];
  firstPlayer: 'Blue' | 'Red';
  validMoves: number[] | undefined;
  nextCard: CardModel;
  redHand: PlayerHand;
  blueHand: PlayerHand;
  hasGameFinished: boolean;
}
export interface GameContextProperties extends State {
  getBoard: () => CellData[];
  setSelectedCell: (cell: CellData) => void;
  setCurrentCard: (currentCard: CardModel) => void;
  setNextCard: (
    nextCard: CardModel,
    targetProperty: 'blueHand' | 'redHand',
    replacementCard: CardModel
  ) => void;
  setCurrentPlayer: (player: 'Blue' | 'Red') => void;
  setValidMoves: (moves: number[]) => void;
  movePiece: (fromCell: CellData, toID: number) => void;
  setHasGameFinished: () => void;
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
  player: 'Blue' | 'Red';
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

export type Actions =
  | SetSelectedCell
  | SetCurrentCard
  | SetNextCard
  | SetCurrentPlayer
  | SetValidMoves
  | MovePiece
  | SetHasGameFinished;
