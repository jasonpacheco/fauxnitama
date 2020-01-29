import CardModel from '../interfaces/card.interface';
import {
  SET_COORDINATES,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
} from '../types';

export type Coordinate = {
  x: number;
  y: number;
};

export interface Piece {
  color: 'Blue' | 'Red';
  type: 'Student' | 'Master';
  startPosition: Coordinate;
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

export interface State {
  board: BoardState;
  clickedCoordinates: Coordinates | undefined;
  selectedCard: CardModel | undefined;
  currentPlayer: 'Blue' | 'Red' | undefined;
  cardSet: CardModel[];
  firstPlayer: 'Blue' | 'Red';
  validMoves: number[] | undefined;
}
export interface GameContextProperties extends State {
  getBoard: () => CellData[];
  setClickedCoordinates: (coordinates: Coordinates) => void;
  setCurrentCard: (card: CardModel) => void;
  setCurrentPlayer: (player: 'Blue' | 'Red') => void;
  setValidMoves: (moves: number[]) => void;
}
interface SetCoordinates {
  type: typeof SET_COORDINATES;
  coordinates: Coordinates;
}

interface SetCurrentCard {
  type: typeof SET_CURRENT_CARD;
  card: CardModel;
}

interface SetCurrentPlayer {
  type: typeof SET_CURRENT_PLAYER;
  player: 'Blue' | 'Red';
}

interface SetValidMoves {
  type: typeof SET_VALID_MOVES;
  moves: number[];
}

export type Actions =
  | SetCoordinates
  | SetCurrentCard
  | SetCurrentPlayer
  | SetValidMoves;
