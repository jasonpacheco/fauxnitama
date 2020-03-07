import heuristic from './heuristic';
import { PiecePosition, STUDENT, MASTER } from '../../engine/types/pieceTypes';
import {
  PLAYER_AI,
  PLAYER_BLUE,
  PlayerType,
} from '../../engine/types/gameTypes';

describe('tests for minimax heuristic', () => {
  const playerPositions: PiecePosition = {
    PLAYER_AI: [
      [0, STUDENT],
      [1, STUDENT],
      [2, MASTER],
      [3, STUDENT],
      [4, STUDENT],
    ],
    PLAYER_BLUE: [
      [20, STUDENT],
      [21, STUDENT],
      [22, MASTER],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const playerPositionsWithoutAIMaster: PiecePosition = {
    PLAYER_AI: [
      [0, STUDENT],
      [1, STUDENT],
      [3, STUDENT],
      [4, STUDENT],
    ],
    PLAYER_BLUE: [
      [20, STUDENT],
      [21, STUDENT],
      [22, MASTER],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const playerPositionsWithoutUserMaster: PiecePosition = {
    PLAYER_AI: [
      [0, STUDENT],
      [1, STUDENT],
      [2, MASTER],
      [3, STUDENT],
      [4, STUDENT],
    ],
    PLAYER_BLUE: [
      [20, STUDENT],
      [21, STUDENT],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const playerPositionsAIMasterCapturesTemple: PiecePosition = {
    PLAYER_AI: [
      [0, STUDENT],
      [1, STUDENT],
      [22, MASTER],
      [3, STUDENT],
      [4, STUDENT],
    ],
    PLAYER_BLUE: [
      [2, STUDENT],
      [19, MASTER],
      [20, STUDENT],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const playerPositionsUserMasterCapturesTemple: PiecePosition = {
    PLAYER_AI: [
      [0, STUDENT],
      [1, STUDENT],
      [3, STUDENT],
      [4, STUDENT],
      [12, MASTER],
    ],
    PLAYER_BLUE: [
      [2, MASTER],
      [20, STUDENT],
      [22, STUDENT],
      [23, STUDENT],
      [24, STUDENT],
    ],
  };

  const halfmoves = 0;
  const players: PlayerType[] = [PLAYER_AI, PLAYER_BLUE];

  test('returns 0 for default position', () => {
    expect(heuristic(playerPositions, players, halfmoves)).toStrictEqual([
      0,
      false,
    ]);
  });

  test('returns 0 at halfmove limit', () => {
    expect(heuristic(playerPositions, players, 50)).toStrictEqual([0, true]);
  });

  test('returns 200 without an AI master', () => {
    expect(
      heuristic(playerPositionsWithoutAIMaster, players, halfmoves)
    ).toStrictEqual([200, true]);
  });

  test('returns 1 without at halfmove limit without ai master', () => {
    expect(
      heuristic(playerPositionsWithoutAIMaster, players, 50)
    ).toStrictEqual([1, true]);
  });

  test('returns -200 without a player master', () => {
    expect(
      heuristic(playerPositionsWithoutUserMaster, players, halfmoves)
    ).toStrictEqual([-200, true]);
  });

  test('returns -200 without a player master', () => {
    expect(
      heuristic(playerPositionsWithoutUserMaster, players, halfmoves)
    ).toStrictEqual([-200, true]);
  });

  test('returns -1 without a player master', () => {
    expect(
      heuristic(playerPositionsWithoutUserMaster, players, 50)
    ).toStrictEqual([-1, true]);
  });

  test('returns -200 when AI master captures temple', () => {
    expect(
      heuristic(playerPositionsAIMasterCapturesTemple, players, halfmoves)
    ).toStrictEqual([-200, true]);
  });

  test('returns -200 when AI master captures temple', () => {
    expect(
      heuristic(playerPositionsAIMasterCapturesTemple, players, halfmoves)
    ).toStrictEqual([-200, true]);
  });

  test('returns 200 when player master captures temple', () => {
    expect(
      heuristic(playerPositionsUserMasterCapturesTemple, players, halfmoves)
    ).toStrictEqual([200, true]);
  });
});
