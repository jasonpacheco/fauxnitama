import { CardName } from './cardTypes';
import { Colors, EndMethod, GameType, PlayerType } from './gameTypes';
import { PieceTuple } from './pieceTypes';

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
  cards: CardName[];
  currentPlayer: PlayerType;
  endMethod: EndMethod | '';
  halfmoves: number;
  idToUpdate: number;
  isGameComplete: boolean;
  move: string[];
  opponent: PlayerType;
  targetID: number;
  winner: PlayerType | '';
}

export interface OnGameInitializationAction {
  type: typeof ON_GAME_INITIALIZATION;
  colors: Colors[];
  firstPlayer: PlayerType;
  gameType: GameType;
  players: PlayerType[];
}

export type EventActions =
  | OnClickPieceAction
  | OnClickSquareAction
  | OnGameInitializationAction;
