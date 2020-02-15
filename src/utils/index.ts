import { Coordinate, SquareData, Piece } from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import cards from '../types/cards';
import constants from './constants';
const { BOARD_ROWS, BOARD_COLS, TEMPLE_ID_BLUE, TEMPLE_ID_RED } = constants;

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
} = cards;

interface SpaceID {
  x: number;
  y: number;
  id: number;
}

export const assignGridID = (): Array<SpaceID> => {
  const idList: SpaceID[] = [];
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      idList.push({ x: row, y: col, id: BOARD_ROWS * row + col });
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
  rows = BOARD_ROWS
): number => rows * coordinate.x + coordinate.y;

/**
 *
 * @param id
 * @param rows
 */
export const idToCoordinate = (id: number, rows = BOARD_ROWS): Coordinate => {
  const x = Math.floor(id / rows);
  const y = id % rows;
  return { x, y };
};

export const idToGridLocation = (id?: number): string => {
  if (id === undefined) {
    return '';
  }
  const rows = ['a', 'b', 'c', 'd', 'e'];
  const coordinates = idToCoordinate(id);
  return `${rows[coordinates.x]}${coordinates.y + 1}`;
};

/**
 * Returns an array of IDs for a list of valid moves corresponding to a reference
 * point. A [validMoves] argument is an array of a move tuple, e.g. [1, 0], where
 * the first index is movement down the X-axis, and the second is movement across
 * the y-axis. The result is an array containing a numeric ID for the valid move
 * or undefined if the move is not valid on the grid.
 * @param validMoves Array<[x: number, y: number]>
 * @param refID optional, default is 12 (id for centerpoint)
 */
export const movesToID = (
  validMoves: number[][],
  refID = 12
): (number | undefined)[] => {
  const refCoordinate = idToCoordinate(refID);
  const { x: refX, y: refY } = refCoordinate;
  return validMoves.map(([x, y]) =>
    x + refX >= BOARD_ROWS ||
    x + refX < 0 ||
    y + refY >= BOARD_COLS ||
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

export const checkMaster = (board: SquareData[], toID: number): boolean => {
  const getCellByID = board[toID];
  const cellPiece = getCellByID.piece;
  return cellPiece?.type === 'Master';
};

export const checkTemple = (piece: Piece, toID: number): boolean => {
  return (
    piece.type === 'Master' &&
    ((piece.color === 'Blue' && toID === TEMPLE_ID_RED) ||
      (piece.color === 'Red' && toID === TEMPLE_ID_BLUE))
  );
};

export const generateEmptyCells = (): SquareData[] => {
  const cells = [];
  for (let i = 5; i <= 19; i++) {
    cells.push({
      id: i,
      piece: undefined,
    });
  }
  return cells;
};
