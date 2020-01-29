import CardModel from '../interfaces/card.interface';

export type Coordinate = {
  x: number;
  y: number;
};

export interface Piece {
  color: 'Blue' | 'Red';
  type: 'Student' | 'Master';
  startPosition: Coordinate;
}

export interface Player {
  pieces: Piece[];
}

interface BoardState {
  layout: (Piece | null)[][];
}

export interface Coordinates extends Coordinate {
  id: number;
}

export interface State {
  board: BoardState;
  clickedCoordinates: Coordinates | undefined;
  selectedCard: CardModel | undefined;
}
export interface GameContextProperties extends State {
  getBoard: () => (Piece | null)[][];
  setClickedCoordinates: (coordinates: Coordinates) => void;
}
interface SetCoordinates {
  type: 'SET_COORDINATES';
  coordinates: Coordinates;
}

export type Actions = SetCoordinates;
