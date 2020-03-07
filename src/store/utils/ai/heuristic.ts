import {
  PiecePosition,
  PieceTuple,
  STUDENT,
  PieceType,
  MASTER,
} from '../../engine/types/pieceTypes';
import { PlayerType, PLAYER_AI } from '../../engine/types/gameTypes';
import {
  TEMPLE_ID_P1,
  TEMPLE_ID_P2,
  HALFMOVE_LIMIT,
} from '../../../utils/constants';

const pieceCounts = (positions: PieceTuple[]): number[] => {
  return positions.reduce(
    (acc: number[], [, pieceType]): number[] => {
      return [
        acc[0] + (pieceType === MASTER ? 1 : 0),
        acc[1] + (pieceType === STUDENT ? 1 : 0),
      ];
    },
    [0, 0]
  );
};

const checkPieceAtID = (
  positions: PieceTuple[],
  targetID: number,
  pieceTypeToSearch: PieceType
): boolean => {
  return positions.some(
    ([id, pieceType]) => id === targetID && pieceType === pieceTypeToSearch
  );
};

const heuristic = (
  piecePositions: PiecePosition,
  players: PlayerType[],
  halfmoves: number
): [number, boolean] => {
  const user = players[1];
  const userPositions = piecePositions[user];
  const aiPositions = piecePositions[PLAYER_AI];
  const [
    [userMasterCount, userStudentCount],
    [aiMasterCount, aiStudentCount],
  ] = [pieceCounts(userPositions), pieceCounts(aiPositions)];

  let material =
    200 * (aiMasterCount - userMasterCount) +
    1 * (aiStudentCount - userStudentCount);

  const [didAICaptureTemple, didUserCaptureTemple] = [
    checkPieceAtID(aiPositions, TEMPLE_ID_P2, MASTER),
    checkPieceAtID(userPositions, TEMPLE_ID_P1, MASTER),
  ];

  material +=
    (didUserCaptureTemple ? -200 : 0) + (didAICaptureTemple ? 200 : 0);

  if (halfmoves >= HALFMOVE_LIMIT) {
    material = material === 0 ? 0 : material > 0 ? 1 : -1;
  }
  let hasGameFinished = false;
  if (halfmoves >= HALFMOVE_LIMIT || Math.abs(material) > 10) {
    hasGameFinished = true;
  }

  return [material, hasGameFinished];
};

export default heuristic;
