export type CardName =
  | 'Boar'
  | 'Cobra'
  | 'Crab'
  | 'Crane'
  | 'Dragon'
  | 'Eel'
  | 'Elephant'
  | 'Frog'
  | 'Goose'
  | 'Horse'
  | 'Mantis'
  | 'Monkey'
  | 'Ox'
  | 'Rabbit'
  | 'Rooster'
  | 'Tiger';

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
  selectedCard: CardName | undefined;
}

export const HAND_BLUE = 'HAND_BLUE';
export const HAND_RED = 'HAND_RED';
export const NEXT_CARD = 'NEXT_CARD';
export const SELECT_CARD = 'SELECT_CARD';
export const SWAP_CARDS = 'SWAP_CARDS';

export type CardsRequestTypes =
  | typeof HAND_BLUE
  | typeof HAND_RED
  | typeof NEXT_CARD;

interface SelectCardAction {
  type: typeof SELECT_CARD;
  selectedCardName: CardName;
}

interface SwapCardsAction {
  type: typeof SWAP_CARDS;
}

export type CardActions = SelectCardAction | SwapCardsAction;
