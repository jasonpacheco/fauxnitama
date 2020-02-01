import {
  assignGridID,
  idToCoordinate,
  coordinateToID,
  movesToID,
  generateCardSet,
  checkMaster,
  checkTemple,
} from './index';
import constants from './constants';
import { CellData } from '../interfaces/context.interface';

describe('tests for assignGridID', () => {
  test('returns an array of length rows * cols', () => {
    expect(assignGridID()).toHaveLength(constants.BOARD_SQUARES);
  });

  test('returns {x: 0, y: 0, id: 0} as first element', () => {
    expect(assignGridID()[0]).toMatchObject({ x: 0, y: 0, id: 0 });
  });

  test('returns {x: 1, y: 0, id: 5} as fifth element', () => {
    expect(assignGridID()[5]).toMatchObject({ x: 1, y: 0, id: 5 });
  });

  test('returns {x: 4, y: 4, id: 24} as last element', () => {
    expect(assignGridID()[constants.BOARD_SQUARES - 1]).toMatchObject({
      x: 4,
      y: 4,
      id: 24,
    });
  });
});

describe('tests for idToCoordinate/coordinateToID', () => {
  test('id = 0 returns {x: 0, y: 0}', () => {
    expect(idToCoordinate(0)).toMatchObject({ x: 0, y: 0 });
  });

  test('id = 12 returns {x: 2, y: 2}', () => {
    expect(idToCoordinate(12)).toMatchObject({ x: 2, y: 2 });
  });

  test('id = 24 returns {x: 4, y: 4}', () => {
    expect(idToCoordinate(24)).toMatchObject({ x: 4, y: 4 });
  });

  test('{x: 0, y: 0} returns id: 0', () => {
    expect(coordinateToID({ x: 0, y: 0 })).toEqual(0);
  });

  test('{x: 2, y: 2} returns id: 12', () => {
    expect(coordinateToID({ x: 2, y: 2 })).toEqual(12);
  });

  test('{x: 4, y: 4} returns id: 24', () => {
    expect(coordinateToID({ x: 4, y: 4 })).toEqual(24);
  });
});

describe('tests for moveToID', () => {
  test('no move equals 12', () => {
    expect(movesToID([[0, 0]])).toEqual([12]);
  });

  test('movement one square up equals 7', () => {
    expect(movesToID([[-1, 0]])).toEqual([7]);
  });

  test('movement one square down equals 17', () => {
    expect(movesToID([[1, 0]])).toEqual([17]);
  });

  test('movement one square left equals 11', () => {
    expect(movesToID([[0, -1]])).toEqual([11]);
  });

  test('movement one square right equals 13', () => {
    expect(movesToID([[0, 1]])).toEqual([13]);
  });

  test('movement one square up from id = 0 is undefined', () => {
    expect(movesToID([[-1, 0]], 0)).toEqual([undefined]);
  });

  test('movement one square left from id = 0 is undefined', () => {
    expect(movesToID([[0, -1]], 0)).toEqual([undefined]);
  });

  test('movement one square right from id = 0 equals 1', () => {
    expect(movesToID([[0, 1]], 0)).toEqual([1]);
  });

  test('movement one square down from id = 0 equals 5', () => {
    expect(movesToID([[1, 0]], 0)).toEqual([5]);
  });

  test('returns correct ids for valid moves from list for ref = 0', () => {
    expect(
      movesToID(
        [
          [-1, 0],
          [0, -1],
          [0, 1],
          [1, 0],
        ],
        0
      )
    ).toEqual([undefined, undefined, 1, 5]);
  });

  test('returns correct ids for valid moves from list for ref = 12', () => {
    expect(
      movesToID([
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0],
      ])
    ).toEqual([7, 11, 13, 17]);
  });

  test('edge case: moving 100 squares will return undefined', () => {
    expect(movesToID([[100, 0]])).toEqual([undefined]);
  });
});

describe('test for generateCardSet', () => {
  test('CardSet returns 5 elements', () => {
    expect(generateCardSet()).toHaveLength(5);
  });
});

describe('test for checkMaster', () => {
  const board: CellData[] = [
    {
      id: 0,
      piece: undefined,
      isValidMove: true,
    },
    {
      id: 1,
      piece: {
        color: 'Blue',
        type: 'Student',
        currentPositionID: 1,
      },
      isValidMove: true,
    },
    {
      id: 2,
      piece: {
        color: 'Blue',
        type: 'Master',
        currentPositionID: 2,
      },
      isValidMove: true,
    },
  ];

  test('return false if cell id is null', () => {
    expect(checkMaster(0, board)).toBeFalsy();
  });

  test('return false if cell id is a piece but not master', () => {
    expect(checkMaster(1, board)).toBeFalsy();
  });

  test('return true if cell id is a master', () => {
    expect(checkMaster(2, board)).toBeTruthy();
  });
});

describe('tests for checkTemple', () => {
  test('returns false when master is not on a temple id', () => {
    expect(checkTemple('Blue', 'Master', 21)).toBeFalsy();
  });

  test('returns false when student is not on a temple id', () => {
    expect(checkTemple('Blue', 'Student', 21)).toBeFalsy();
  });

  test('returns false when student is on a temple id of 2', () => {
    expect(checkTemple('Blue', 'Student', 2)).toBeFalsy();
  });

  test('returns false when student is on a temple id of 22', () => {
    expect(checkTemple('Blue', 'Student', 22)).toBeFalsy();
  });

  test('returns true when Blue master is on a temple id of 2', () => {
    expect(checkTemple('Blue', 'Master', 2)).toBeTruthy();
  });

  test('returns false when Blue master is on a temple id of 22', () => {
    expect(checkTemple('Blue', 'Master', 22)).toBeFalsy();
  });

  test('returns false when Red master is on a temple id of 2', () => {
    expect(checkTemple('Red', 'Master', 2)).toBeFalsy();
  });

  test('returns true when Red master is on a temple id of 22', () => {
    expect(checkTemple('Red', 'Master', 22)).toBeTruthy();
  });
});
