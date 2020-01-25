export const BOARD_GAME = {
  ROWS: 5,
  COLS: 5,
  SQUARES: function(): number {
    return this.ROWS * this.COLS;
  },
};

interface SpaceID {
  x: number;
  y: number;
  id: number;
}

export const assignGridID = (): Array<SpaceID> => {
  const { ROWS, COLS } = BOARD_GAME;
  const idList: SpaceID[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      idList.push({ x: row, y: col, id: ROWS * row + col });
    }
  }
  return idList;
};

export const getIds = (): Array<SpaceID> => assignGridID();
