import {
  getIDs,
  idToCoordinate,
  coordinateToID,
  movesToID,
  idToGridLocation,
  gridLocationToID,
} from './index';
import constants from './constants';

describe('tests for getIDs', () => {
  test('returns an array of length rows * cols', () => {
    expect(getIDs()).toHaveLength(constants.BOARD_SQUARES);
  });

  test('returns 0 as first element', () => {
    expect(getIDs()[0]).toEqual(0);
  });

  test('returns 5 as fifth element', () => {
    expect(getIDs()[5]).toEqual(5);
  });

  test('returns 24 as last element', () => {
    expect(getIDs()[constants.BOARD_SQUARES - 1]).toEqual(24);
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

describe('tests for idToGridLocation', () => {
  test('returns e3 for id=22', () => {
    expect(idToGridLocation(22)).toEqual('e3');
  });

  test('returns a3 for id=2', () => {
    expect(idToGridLocation(2)).toEqual('a3');
  });

  test('returns c3 for id=12', () => {
    expect(idToGridLocation(12)).toEqual('c3');
  });

  test('returns a1 for id=0', () => {
    expect(idToGridLocation(0)).toEqual('a1');
  });
});

describe('tests for gridLocationToID', () => {
  test('returns 22 for e3', () => {
    expect(gridLocationToID('e3')).toEqual(22);
  });

  test('returns 2 for a3', () => {
    expect(gridLocationToID('a3')).toEqual(2);
  });

  test('returns 12 for c3', () => {
    expect(gridLocationToID('c3')).toEqual(12);
  });

  test('returns 0 for a1', () => {
    expect(gridLocationToID('a1')).toEqual(0);
  });
});
