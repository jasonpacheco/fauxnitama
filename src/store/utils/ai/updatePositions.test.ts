import updatePositions from './updatePositions';
import { PiecePosition, STUDENT, MASTER } from '../../engine/types/pieceTypes';
import {
  PlayerType,
  PLAYER_AI,
  PLAYER_RED,
} from '../../engine/types/gameTypes';

describe('tests for updatePositions', () => {
  const playerPositions: PiecePosition = {
    PLAYER_AI: [
      [1, STUDENT],
      [2, MASTER],
      [3, STUDENT],
      [4, STUDENT],
      [5, STUDENT],
    ],
    PLAYER_RED: [
      [8, MASTER],
      [20, STUDENT],
      [21, STUDENT],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const players: PlayerType[] = [PLAYER_AI, PLAYER_RED];

  test('returns a value', () => {
    const updated = updatePositions(playerPositions, 2, 8, players, PLAYER_AI);
    console.log(updated);
    expect(updated).toBeDefined();
  });
});
