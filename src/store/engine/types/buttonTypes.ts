import { CardName } from './cardTypes';
import { PlayerType, EndMethod } from './gameTypes';

export const ON_CLICK_BUTTON_NO_RESTART = 'ON_CLICK_BUTTON_NO_RESTART';
export const ON_CLICK_BUTTON_PASS = 'ON_CLICK_BUTTON_PASS';
export const ON_CLICK_BUTTON_PAUSE = 'ON_CLICK_BUTTON_PAUSE';
export const ON_CLICK_BUTTON_PROMPT = 'ON_CLICK_BUTTON_PROMPT';
export const ON_CLICK_BUTTON_YES_RESTART = 'ON_CLICK_BUTTON_YES_RESTART';
export const ON_CLICK_BUTTON_FEN = 'ON_CLICK_BUTTON_FEN';

export interface OnClickButtonNoRestart {
  type: typeof ON_CLICK_BUTTON_NO_RESTART;
}
export interface OnClickButtonYesRestart {
  type: typeof ON_CLICK_BUTTON_YES_RESTART;
  cards: CardName[];
  currentPlayer: PlayerType;
  players: PlayerType[];
}
export interface OnClickButtonPass {
  type: typeof ON_CLICK_BUTTON_PASS;
  move: string[];
  currentPlayer: PlayerType;
  halfmoves: number;
  endMethod: EndMethod | '';
  isGameComplete: boolean;
}
export interface OnClickButtonPause {
  type: typeof ON_CLICK_BUTTON_PAUSE;
}
export interface OnClickButtonPrompt {
  type: typeof ON_CLICK_BUTTON_PROMPT;
}
export interface OnClickButtonFEN {
  type: typeof ON_CLICK_BUTTON_FEN;
}

export type ButtonActions =
  | OnClickButtonYesRestart
  | OnClickButtonPass
  | OnClickButtonPause;
