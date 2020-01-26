import { assignGridID, BOARD_GAME, getTempleID } from './index';

describe('tests for assignGridID', () => {
  test('returns an array of length rows * cols', () => {
    expect(assignGridID()).toHaveLength(BOARD_GAME.SQUARES());
  });

  test('returns {x: 0, y: 0, id: 0} as first element', () => {
    expect(assignGridID()[0]).toMatchObject({ x: 0, y: 0, id: 0 });
  });

  test('returns {x: 1, y: 0, id: 5} as fifth element', () => {
    expect(assignGridID()[5]).toMatchObject({ x: 1, y: 0, id: 5 });
  });

  test('returns {x: 4, y: 4, id: 24} as last element', () => {
    expect(assignGridID()[BOARD_GAME.SQUARES() - 1]).toMatchObject({
      x: 4,
      y: 4,
      id: 24,
    });
  });
});

describe('tests for getTempleID', () => {
  test('returns an object', () => {
    expect(getTempleID()).toHaveProperty('blue');
    expect(getTempleID()).toHaveProperty('red');
  });
  test('returns a red temple id of {x: 0, y: 2, id: 2}', () => {
    expect(getTempleID().red).toMatchObject({ x: 0, y: 2, id: 2 });
  });
  test('returns a blue temple id of {x: 4, y: 2, id: 22}', () => {
    expect(getTempleID().blue).toMatchObject({ x: 4, y: 2, id: 22 });
  });
});
