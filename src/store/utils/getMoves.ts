import { coordinateToID, idToCoordinate } from '../../utils';
import { BOARD_ROWS as ROWS, BOARD_COLS as COLS } from '../../utils/constants';
import * as PieceType from '../engine/types/pieceTypes';

const transposeCardMovement = (
  validMoves: number[][] | undefined
): number[][] => {
  return validMoves ? validMoves.map(move => [-move[0], -move[1]]) : [];
};

export const isValidSpace = (
  positionID: number,
  currentPlayerPositions: PieceType.PieceTuple[]
): boolean => {
  return currentPlayerPositions.find(([id]) => id === positionID)
    ? false
    : true;
};

/**
 *
 * @param selectedPieceID id of currently selected piece
 * @param isTransposable if the current player is the first player in players[]
 * @param validMovesFromCard moves from the currently selected card
 * @param currentPlayerPositions piecePositions[currentPlayer]
 */
const getMoves = (
  selectedPieceID: number,
  isTransposable: boolean,
  validMovesFromCard: number[][],
  currentPlayerPositions: PieceType.PieceTuple[]
): number[] => {
  if (
    currentPlayerPositions.find(([id]) => id === selectedPieceID) === undefined
  )
    return [];

  const { x, y } = idToCoordinate(selectedPieceID);
  if (isTransposable)
    validMovesFromCard = transposeCardMovement(validMovesFromCard);

  return validMovesFromCard
    ? validMovesFromCard
        .reduce((acc, [moveX, moveY]) => {
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
            isValidSpace(positionID, currentPlayerPositions)
          ) {
            acc.push(positionID);
          }
          return acc;
        }, [])
        .sort((a, b) => a - b)
    : [];
};

export default getMoves;
