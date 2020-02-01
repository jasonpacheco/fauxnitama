import { CellData } from '../interfaces/context.interface';

export const Opponent: CellData[] = [
  {
    id: 0,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 0 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 1,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 1 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 2,
    piece: { color: 'Red', type: 'Master', currentPosition: { x: 0, y: 2 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 3,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 3 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 4,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 4 } },
    isValidMove: false,
    isEmpty: false,
  },
];

export const Player: CellData[] = [
  {
    id: 20,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 0 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 21,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 1 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 22,
    piece: { color: 'Blue', type: 'Master', currentPosition: { x: 4, y: 2 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 23,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 3 } },
    isValidMove: false,
    isEmpty: false,
  },
  {
    id: 24,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 4 } },
    isValidMove: false,
    isEmpty: false,
  },
];
