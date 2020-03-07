import updatePositions from './updatePositions';
import { PiecePosition, STUDENT, MASTER } from '../../engine/types/pieceTypes';
import {
  PlayerType,
  PLAYER_AI,
  PLAYER_BLUE,
} from '../../engine/types/gameTypes';

describe('tests for updatePositions', () => {
  const playerPositions: PiecePosition = {
    PLAYER_AI: [
      [0, STUDENT],
      [1, STUDENT],
      [2, MASTER],
      [3, STUDENT],
      [17, STUDENT],
    ],
    PLAYER_BLUE: [
      [20, STUDENT],
      [21, STUDENT],
      [22, MASTER],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const players: PlayerType[] = [PLAYER_AI, PLAYER_BLUE];

  test('returns a value', () => {
    const updated = updatePositions(
      playerPositions,
      17,
      20,
      players,
      PLAYER_AI
    );
    console.log(updated);
    expect(updated).toBeDefined();
  });
});
