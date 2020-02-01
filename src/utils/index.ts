import { Coordinate, CellData } from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import CardTypes from '../components/Card/CardTypes';
const {
  Boar,
  Cobra,
  Crab,
  Crane,
  Dragon,
  Eel,
  Elephant,
  Frog,
  Goose,
  Horse,
  Mantis,
  Monkey,
  Ox,
  Rabbit,
  Rooster,
  Tiger,
} = CardTypes;

export const BOARD_GAME = {
  ROWS: 5,
  COLS: 5,
  SQUARES: function(): number {
    return this.ROWS * this.COLS;
  },
  BLUE_TEMPLE_ID: 22,
  RED_TEMPLE_ID: 2,
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

export const getIDs = (): Array<SpaceID> => assignGridID();

/**
 * Converts a [coordinate] of type <Coordinate> { x: number, y: number } to
 * a numeric id based on an optional [?rows] argument.
 * @param coordinate {x: number, y: number}
 * @param rows optional, default = rows in board game
 */
export const coordinateToID = (
  coordinate: Coordinate,
  rows = BOARD_GAME.ROWS
): number => {
  return rows * coordinate.x + coordinate.y;
};

/**
 *
 * @param id
 * @param rows
 */
export const idToCoordinate = (
  id: number,
  rows = BOARD_GAME.ROWS
): Coordinate => {
  const x = Math.floor(id / rows);
  const y = id % rows;
  return { x, y };
};

/**
 * Returns an array of IDs for a list of valid moves corresponding to a reference
 * point. A [validMoves] argument is an array of a move tuple, e.g. [1, 0], where
 * the first index is movement down the X-axis, and the second is movement across
 * the y-axis. The result is an array containing a numeric ID for the valid move
 * or undefined if the move is not valid on the grid.
 * @param validMoves Array<[x: number, y: number]>
 * @param refID optional
 */
export const movesToID = (
  validMoves: number[][],
  refID = 12
): (number | undefined)[] => {
  const refCoordinate = idToCoordinate(refID);
  const { x: refX, y: refY } = refCoordinate;
  return validMoves.map(([x, y]) =>
    x + refX >= BOARD_GAME.ROWS ||
    x + refX < 0 ||
    y + refY >= BOARD_GAME.COLS ||
    y + refY < 0
      ? undefined
      : coordinateToID({ x: x + refX, y: y + refY })
  );
};

export const generateCardSet = (numCards = 5): CardModel[] => {
  const cards = [
    Boar,
    Cobra,
    Crab,
    Crane,
    Dragon,
    Eel,
    Elephant,
    Frog,
    Goose,
    Horse,
    Mantis,
    Monkey,
    Ox,
    Rabbit,
    Rooster,
    Tiger,
  ];

  const cardSet: CardModel[] = [];

  for (let i = 0; i < numCards; i++) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    cardSet.push(cards[randomIndex]);
    cards.splice(randomIndex, 1);
  }

  return cardSet;
};

export const checkMaster = (toID: number, board: CellData[]): boolean => {
  const getCellByID = board[toID];
  const cellPiece = getCellByID.piece;
  return cellPiece?.type === 'Master';
};

export const checkTemple = (
  playerColor: 'Blue' | 'Red' | undefined,
  playerType: 'Student' | 'Master' | undefined,
  toID: number
): boolean => {
  return (
    playerType === 'Master' &&
    ((playerColor === 'Blue' && toID === 2) ||
      (playerColor === 'Red' && toID === 22))
  );
};

export const generateEmptyCells = (): CellData[] => {
  const cells = [];
  for (let i = 5; i <= 19; i++) {
    cells.push({
      id: i,
      piece: null,
      isValidMove: false,
      isEmpty: true,
      isBlue: false,
      isRed: false,
    });
  }
  return cells;
};
