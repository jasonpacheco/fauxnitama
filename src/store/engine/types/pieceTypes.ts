import { PlayerType } from './gameTypes';

export const MASTER = 'MASTER';
export const STUDENT = 'STUDENT';
export const SET_SELECTED_PIECE = 'SET_SELECTED_PIECE';
export const INITIALIZE_PIECE_POSITIONS = 'INITIALIZE_PIECE_POSITIONS';
export const INCREMENT_HALFMOVE = 'INCREMENT_HALFMOVE';
export const RESET_HALFMOVE = 'RESET_HALFMOVE';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const REMOVE_PIECE = 'REMOVE_PIECE';
export const ADD_VALID_MOVES = 'ADD_VALID_MOVES';

export type PieceType = typeof MASTER | typeof STUDENT;

export type PieceTuple = [number, PieceType];
export type PiecePosition = {
  [key: string]: PieceTuple[];
};

export interface PieceState {
  piecePositions: PiecePosition;
  selectedPiece: PieceTuple | [];
  halfmoves: number;
  validMoves: number[];
}

interface SetSelectedPiece {
  type: typeof SET_SELECTED_PIECE;
  id: number;
  pieceType: PieceType;
}

interface InitializePiecePositions {
  type: typeof INITIALIZE_PIECE_POSITIONS;
  players: PlayerType[];
}

interface UpdatePosition {
  type: typeof UPDATE_POSITION;
  playerToUpdate: PlayerType;
  pieceToUpdateID: number;
  newLocationID: number;
}

interface RemovePiece {
  type: typeof REMOVE_PIECE;
  playerToUpdate: PlayerType;
  pieceToRemoveID: number;
}

interface IncrementHalfmove {
  type: typeof INCREMENT_HALFMOVE;
}

interface ResetHalfmove {
  type: typeof RESET_HALFMOVE;
}

interface AddValidMoves {
  type: typeof ADD_VALID_MOVES;
  validMoves: number[];
}

export type PieceActions =
  | IncrementHalfmove
  | ResetHalfmove
  | InitializePiecePositions
  | SetSelectedPiece
  | UpdatePosition
  | RemovePiece
  | AddValidMoves;
