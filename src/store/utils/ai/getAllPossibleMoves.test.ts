import getAllPossibleMoves from './getAllPossibleMoves';
import {
  PLAYER_AI,
  PLAYER_BLUE,
  PlayerType,
} from '../../engine/types/gameTypes';
import { PiecePosition, STUDENT, MASTER } from '../../engine/types/pieceTypes';
import { CardName } from '../../engine/types/cardTypes';

describe('test for getAllPossibleMoves', () => {
  const cards: CardName[] = ['Boar', 'Cobra', 'Rooster', 'Ox', 'Fox'];
  const players: PlayerType[] = [PLAYER_AI, PLAYER_BLUE];
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

  test('returns a value', () => {
    const possibleMoves = getAllPossibleMoves(
      cards,
      players,
      PLAYER_AI,
      playerPositions
    );
    console.log(possibleMoves);
    console.log(possibleMoves[0][1][0]);
    expect(possibleMoves).toBeDefined();
  });
});
