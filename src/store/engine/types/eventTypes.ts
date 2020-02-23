import { CardName } from './cardTypes';
import { PieceTuple } from './pieceTypes';

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

export type EventActions = OnClickCardAction | OnClickPieceAction;
