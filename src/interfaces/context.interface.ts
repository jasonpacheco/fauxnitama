import CardModel from '../interfaces/card.interface';
import { SET_COORDINATES, SET_CURRENT_CARD } from '../types';

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
  type: typeof SET_COORDINATES;
  coordinates: Coordinates;
}

interface SetCurrentCard {
  type: typeof SET_CURRENT_CARD;
  card: CardModel;
}

export type Actions = SetCoordinates | SetCurrentCard;
