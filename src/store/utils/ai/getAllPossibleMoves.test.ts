import getAllPossibleMoves from './getAllPossibleMoves';
import {
  PLAYER_AI,
  PLAYER_RED,
  PlayerType,
} from '../../engine/types/gameTypes';
import { PiecePosition, STUDENT, MASTER } from '../../engine/types/pieceTypes';
import { CardName } from '../../engine/types/cardTypes';

describe('test for getAllPossibleMoves', () => {
  const cards: CardName[] = ['Rooster', 'Tiger', 'Ox', 'Rat', 'Fox'];
  const players: PlayerType[] = [PLAYER_AI, PLAYER_RED];
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

  test('returns a value', () => {
    const possibleMoves = getAllPossibleMoves(
      cards,
      players,
      3,
      PLAYER_AI,
      playerPositions
    );
    console.log(possibleMoves);

    expect(possibleMoves).toBeDefined();
  });
});
