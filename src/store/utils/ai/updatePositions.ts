import { PiecePosition, PieceTuple } from '../../engine/types/pieceTypes';
import { PlayerType } from '../../engine/types/gameTypes';

const updatePositions = (
  currentPositions: PiecePosition,
  pieceToUpdateID: number,
  newPositionID: number,
  players: PlayerType[],
  playerToUpdate: PlayerType
): PiecePosition => {
  const otherPlayer = players[1 - players.indexOf(playerToUpdate)];
  currentPositions[playerToUpdate] = currentPositions[playerToUpdate]
    .map<PieceTuple>(([id, pieceType]) => {
      if (id === pieceToUpdateID) {
        return [newPositionID, pieceType];
      }
      return [id, pieceType];
    })
    .sort((tupleA: PieceTuple, tupleB: PieceTuple) => tupleA[0] - tupleB[0]);
  currentPositions[otherPlayer] = currentPositions[otherPlayer].filter(
    ([id]) => id !== newPositionID
  );
  return currentPositions;
};

export default updatePositions;
