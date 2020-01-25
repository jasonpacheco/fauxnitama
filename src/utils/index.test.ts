import { assignGridID, BOARD_GAME } from './index';

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
