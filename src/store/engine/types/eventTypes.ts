import { CardName } from './cardTypes';
import { PieceTuple } from './pieceTypes';
import { PlayerType, EndMethod, GameType, Colors } from './gameTypes';

export const ON_CLICK_PIECE = 'ON_CLICK_PIECE';
export const ON_CLICK_SQUARE = 'ON_CLICK_SQUARE';
export const ON_GAME_INITIALIZATION = 'ON_GAME_INITIALIZATION';

export interface OnClickPieceAction {
  type: typeof ON_CLICK_PIECE;
  selectedPiece: PieceTuple;
  validMoves: number[];
}

export interface OnClickSquareAction {
  type: typeof ON_CLICK_SQUARE;
  currentPlayer: PlayerType;
  opponent: PlayerType;
  idToUpdate: number;
  targetID: number;
  halfmoves: number;
  endMethod: EndMethod | '';
  winner: PlayerType | '';
  isGameComplete: boolean;
  cards: CardName[];
  move: string[];
}

export interface OnGameInitializationAction {
  type: typeof ON_GAME_INITIALIZATION;
  gameType: GameType;
  players: PlayerType[];
  firstPlayer: PlayerType;
  colors: Colors[];
}

export type EventActions =
  | OnClickPieceAction
  | OnClickSquareAction
  | OnGameInitializationAction;
