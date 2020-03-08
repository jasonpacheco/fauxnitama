import { PlayerType } from '../../engine/types/gameTypes';
import { PiecePosition, PieceTuple } from '../../engine/types/pieceTypes';

const updatePositions = (
  currentPositions: PiecePosition,
  pieceToUpdateID: number,
  newPositionID: number,
  players: PlayerType[],
  playerToUpdate: PlayerType
): PiecePosition => {
  const otherPlayer = players[1 - players.indexOf(playerToUpdate)];

  if (currentPositions[playerToUpdate].find(([id]) => id === pieceToUpdateID)) {
    currentPositions[otherPlayer] = currentPositions[otherPlayer].filter(
      ([id]) => id !== newPositionID
    );
  }

  currentPositions[playerToUpdate] = currentPositions[playerToUpdate]
    .map<PieceTuple>(([id, pieceType]) => {
      if (id === pieceToUpdateID) {
        return [newPositionID, pieceType];
      }
      return [id, pieceType];
    })
    .sort((tupleA: PieceTuple, tupleB: PieceTuple) => tupleA[0] - tupleB[0]);

  return currentPositions;
};

export default updatePositions;
