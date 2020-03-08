export const HAND_BLUE = 'HAND_BLUE';
export const HAND_RED = 'HAND_RED';
export const NEXT_CARD = 'NEXT_CARD';
export const ON_CLICK_CARD = 'ON_CLICK_CARD';

export type CardName =
  | 'Bear'
  | 'Boar'
  | 'Cobra'
  | 'Crab'
  | 'Crane'
  | 'Dog'
  | 'Dragon'
  | 'Eel'
  | 'Elephant'
  | 'Fox'
  | 'Frog'
  | 'Giraffe'
  | 'Goose'
  | 'Horse'
  | 'Iguana'
  | 'Kirin'
  | 'Mantis'
  | 'Monkey'
  | 'Mouse'
  | 'Otter'
  | 'Ox'
  | 'Panda'
  | 'Phoenix'
  | 'Rabbit'
  | 'Rat'
  | 'Rooster'
  | 'Sable'
  | 'Sea Snake'
  | 'Tanuki'
  | 'Tiger'
  | 'Turtle'
  | 'Viper';

export interface CardProperties {
  name: CardName;
  color: string;
  image: string;
  miniBoard: string[][];
  moves: number[][];
  stamp: 'Blue' | 'Red';
}

export interface CardState {
  cards: CardName[];
  selectedCardName: CardName | '';
}

export type CardsRequestTypes =
  | typeof HAND_BLUE
  | typeof HAND_RED
  | typeof NEXT_CARD;

export interface OnClickCardAction {
  type: typeof ON_CLICK_CARD;
  selectedCardName: CardName;
  validMoves: number[];
}

export type CardActions = OnClickCardAction;
