import { Piece, PlayerColor } from '../interfaces/context.interface';
import { coordinateToID, idToCoordinate } from '../utils';
import { SquareData } from '../interfaces/context.interface';
import { BOARD_ROWS as ROWS, BOARD_COLS as COLS } from '../utils/constants';

const transposeCardMovement = (
  validMoves: number[][] | undefined
): number[][] => {
  return validMoves ? validMoves.map(move => [-move[0], -move[1]]) : [];
};

const isValidSpace = (
  positionID: number,
  board: SquareData[],
  currentPlayer: PlayerColor
): boolean => {
  if (board[positionID].piece === undefined) {
    return true;
  } else if (board[positionID].piece?.color !== currentPlayer) {
    return true;
  }
  return false;
};

export default (
  piece: Piece,
  validMovesFromCard: number[][] | undefined,
  board: SquareData[]
): number[] => {
  const { x, y } = idToCoordinate(piece.currentPositionID);
  const color = piece.color;
  if (color === 'Red')
    validMovesFromCard = transposeCardMovement(validMovesFromCard);
  return validMovesFromCard
    ? validMovesFromCard.reduce((acc, [moveX, moveY]) => {
        const [xDisplacement, yDisplacement] = [x + moveX, y + moveY];
        const positionID = coordinateToID({
          x: xDisplacement,
          y: yDisplacement,
        });
        if (
          xDisplacement < ROWS &&
          xDisplacement >= 0 &&
          yDisplacement < COLS &&
          yDisplacement >= 0 &&
          isValidSpace(positionID, board, color)
        ) {
          acc.push(positionID);
        }
        return acc;
      }, [])
    : [];
};
