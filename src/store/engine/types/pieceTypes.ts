export const MASTER = 'MASTER';
export const STUDENT = 'STUDENT';

export type PieceType = typeof MASTER | typeof STUDENT;

export type PieceTuple = [number, PieceType];
export type PiecePosition = {
  [key: string]: PieceTuple[];
};

export interface PieceState {
  halfmoves: number;
  piecePositions: PiecePosition;
  selectedPiece: PieceTuple | [];
  validMoves: number[];
}
