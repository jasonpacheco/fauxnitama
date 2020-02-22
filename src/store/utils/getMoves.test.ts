import getMoves, { isValidSpace } from './getMoves';
import { MASTER, STUDENT, PieceTuple } from '../engine/types/pieceTypes';

describe('tests for getMoves', () => {
  describe('test for isValidSpace helper', () => {
    test("it is a valid space if target id is a not occupied by a current player's piece.", () => {
      const playerPositions: PieceTuple[] = [
        [0, MASTER],
        [1, STUDENT],
        [5, STUDENT],
        [7, STUDENT],
        [8, STUDENT],
      ];

      expect(isValidSpace(0, playerPositions)).toEqual(false);
      expect(isValidSpace(1, playerPositions)).toEqual(false);
      expect(isValidSpace(5, playerPositions)).toEqual(false);
      expect(isValidSpace(7, playerPositions)).toEqual(false);
      expect(isValidSpace(8, playerPositions)).toEqual(false);
      expect(isValidSpace(6, playerPositions)).toEqual(true);
      expect(isValidSpace(9, playerPositions)).toEqual(true);
      expect(isValidSpace(10, playerPositions)).toEqual(true);
      expect(isValidSpace(11, playerPositions)).toEqual(true);
      expect(isValidSpace(12, playerPositions)).toEqual(true);
    });
  });

  describe('tests for getMoves method', () => {
    // prettier-ignore
    const boarMoves = [[0, -1],[-1, 0],[0, 1]];
    // prettier-ignore
    const crabMoves = [[0, -2],[-1, 0],[0, 2]];
    // prettier-ignore
    const dragonMoves = [[-1, -2],[1, -1],[1, 1],[-1, 2]];
    const currentPlayerPositions: PieceTuple[] = [
      [0, MASTER],
      [1, STUDENT],
      [5, STUDENT],
      [7, STUDENT],
      [8, STUDENT],
    ];

    const currentPlayerPositions2: PieceTuple[] = [
      [0, MASTER],
      [4, STUDENT],
      [5, STUDENT],
      [9, STUDENT],
      [24, STUDENT],
    ];

    test('gets valid moves for boar (transpose)', () => {
      expect(getMoves(0, true, boarMoves, currentPlayerPositions)).toEqual([]);
      // prettier-ignore
      expect(getMoves(1, true, boarMoves, currentPlayerPositions)).toEqual([2,6]);
      // prettier-ignore
      expect(getMoves(5, true, boarMoves, currentPlayerPositions)).toEqual([6,10]);
      // prettier-ignore
      expect(getMoves(7, true, boarMoves, currentPlayerPositions)).toEqual([6,12]);
      // prettier-ignore
      expect(getMoves(8, true, boarMoves, currentPlayerPositions)).toEqual([9,13]);
    });

    test('gets valid moves for crab (transpose)', () => {
      expect(getMoves(0, true, crabMoves, currentPlayerPositions)).toEqual([2]);
      // prettier-ignore
      expect(getMoves(1, true, crabMoves, currentPlayerPositions)).toEqual([3,6]);
      // prettier-ignore
      expect(getMoves(5, true, crabMoves, currentPlayerPositions)).toEqual([10]);
      // prettier-ignore
      expect(getMoves(7, true, crabMoves, currentPlayerPositions)).toEqual([9,12]);
      // prettier-ignore
      expect(getMoves(8, true, crabMoves, currentPlayerPositions)).toEqual([6,13]);
    });

    test('gets valid moves for dragon (transpose)', () => {
      expect(getMoves(0, true, dragonMoves, currentPlayerPositions)).toEqual(
        []
      );
      // prettier-ignore
      expect(getMoves(1, true, dragonMoves, currentPlayerPositions)).toEqual([]);
      // prettier-ignore
      expect(getMoves(5, true, dragonMoves, currentPlayerPositions)).toEqual([12]);
      // prettier-ignore
      expect(getMoves(7, true, dragonMoves, currentPlayerPositions)).toEqual([3, 10, 14]);
      // prettier-ignore
      expect(getMoves(8, true, dragonMoves, currentPlayerPositions)).toEqual([2, 4, 11]);
    });

    test('gets valid moves for boar', () => {
      // prettier-ignore
      expect(getMoves(0, false, boarMoves, currentPlayerPositions2)).toEqual([1]);
      // prettier-ignore
      expect(getMoves(4, false, boarMoves, currentPlayerPositions2)).toEqual([3]);
      // prettier-ignore
      expect(getMoves(5, false, boarMoves, currentPlayerPositions2)).toEqual([6]);
      // prettier-ignore
      expect(getMoves(9, false, boarMoves, currentPlayerPositions2)).toEqual([8]);
      // prettier-ignore
      expect(getMoves(24, false, boarMoves, currentPlayerPositions2)).toEqual([19,23]);
    });

    test('gets valid moves for crab', () => {
      // prettier-ignore
      expect(getMoves(0, false, crabMoves, currentPlayerPositions2)).toEqual([2]);
      // prettier-ignore
      expect(getMoves(4, false, crabMoves, currentPlayerPositions2)).toEqual([2]);
      // prettier-ignore
      expect(getMoves(5, false, crabMoves, currentPlayerPositions2)).toEqual([7]);
      // prettier-ignore
      expect(getMoves(9, false, crabMoves, currentPlayerPositions2)).toEqual([7]);
      // prettier-ignore
      expect(getMoves(24, false, crabMoves, currentPlayerPositions2)).toEqual([19,22]);
    });

    test('gets valid moves for dragon', () => {
      expect(getMoves(0, false, dragonMoves, currentPlayerPositions)).toEqual([
        6,
      ]);
      // prettier-ignore
      expect(getMoves(1, false, dragonMoves, currentPlayerPositions)).toEqual([]);
      // prettier-ignore
      expect(getMoves(5, false, dragonMoves, currentPlayerPositions)).toEqual([2, 11]);
      // prettier-ignore
      expect(getMoves(7, false, dragonMoves, currentPlayerPositions)).toEqual([4,11,13]);
      // prettier-ignore
      expect(getMoves(8, false, dragonMoves, currentPlayerPositions)).toEqual([12,14]);
    });
  });
});
