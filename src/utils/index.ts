import CardModel, { CardName } from '../interfaces/card.interface';
import cards from '../types/cards';
import constants from './constants';
const { BOARD_ROWS, BOARD_COLS } = constants;

const {
  Bear,
  Boar,
  Cobra,
  Crab,
  Crane,
  Dog,
  Dragon,
  Eel,
  Elephant,
  Fox,
  Frog,
  Giraffe,
  Goose,
  Horse,
  Iguana,
  Kirin,
  Mantis,
  Monkey,
  Mouse,
  Otter,
  Ox,
  Panda,
  Phoenix,
  Rabbit,
  Rat,
  Rooster,
  Sable,
  SeaSnake,
  Tanuki,
  Tiger,
  Turtle,
  Viper,
} = cards;

export const getIDs = (): number[] => {
  const idList: number[] = [];
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      idList.push(BOARD_ROWS * row + col);
    }
  }
  return idList;
};

interface Coordinate {
  x: number;
  y: number;
}

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

interface NameToCard {
  [key: string]: CardModel;
}
export const cardNameToCard = (name: CardName): CardModel => {
  const cards: NameToCard = {
    Bear,
    Boar,
    Cobra,
    Crab,
    Crane,
    Dog,
    Dragon,
    Eel,
    Elephant,
    Fox,
    Frog,
    Giraffe,
    Goose,
    Horse,
    Iguana,
    Kirin,
    Mantis,
    Monkey,
    Mouse,
    Otter,
    Ox,
    Panda,
    Phoenix,
    Rabbit,
    Rat,
    Rooster,
    Sable,
    'Sea Snake': SeaSnake,
    Tanuki,
    Tiger,
    Turtle,
    Viper,
  };

  return cards[name];
};

export const gridLocationToID = (gridLocation: string): number => {
  const [rowLetter, colString] = gridLocation.split('');
  const letters = ['a', 'b', 'c', 'd', 'e'];
  const nums = ['1', '2', '3', '4', '5'];
  const rowNum = letters.indexOf(rowLetter);
  const colNum = nums.indexOf(colString);
  return BOARD_ROWS * rowNum + colNum;
};

export interface FunctionsObject {
  [key: string]: () => void;
}
