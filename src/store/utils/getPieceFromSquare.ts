import { PieceTuple } from '../engine/types/pieceTypes';

const getPieceFromSquare = (
  selectedSquareID: number,
  currentPlayerPositions: PieceTuple[]
): PieceTuple | undefined =>
  currentPlayerPositions.find(pieceTuple => selectedSquareID === pieceTuple[0]);

export default getPieceFromSquare;
