import { CardName } from './cardTypes';
import { PieceTuple } from './pieceTypes';
import { PlayerType, EndMethod } from './gameTypes';

export const ON_CLICK_CARD = 'ON_CLICK_CARD';
export const ON_CLICK_PIECE = 'ON_CLICK_PIECE';
export const ON_CLICK_SQUARE = 'ON_CLICK_SQUARE';

export interface OnClickCardAction {
  type: typeof ON_CLICK_CARD;
  selectedCardName: CardName;
  validMoves: number[];
}

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
}

export type EventActions =
  | OnClickCardAction
  | OnClickPieceAction
  | OnClickSquareAction;
