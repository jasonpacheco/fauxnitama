type Coordinate = {
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

export interface State {
  board: BoardState;
  message: string;
}
export interface GameContextProperties extends State {
  getBoard: () => (Piece | null)[][];
}

interface SetMessage {
  type: 'SET_MESSAGE';
  message: string;
}

export type Actions = SetMessage;
