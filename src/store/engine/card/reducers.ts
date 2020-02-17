import {
  CardActions,
  CardName,
  CardsRequestTypes,
  CardState,
  HAND_BLUE,
  HAND_RED,
  NEXT_CARD,
  SELECT_CARD,
  SWAP_CARDS,
} from './types';
import sampleSize from 'lodash.samplesize';

export const generateRandomCards = (numberOfCards = 5): CardName[] => {
  const cards: CardName[] = [
    'Boar',
    'Cobra',
    'Crab',
    'Crane',
    'Dragon',
    'Eel',
    'Elephant',
    'Frog',
    'Goose',
    'Horse',
    'Mantis',
    'Monkey',
    'Ox',
    'Rabbit',
    'Rooster',
    'Tiger',
  ];

  return sampleSize(cards, numberOfCards);
};

export const getCards = (
  cards: CardName[],
  cardFor: CardsRequestTypes
): CardName[] => {
  switch (cardFor) {
    case HAND_BLUE:
      return [cards[0], cards[1]];
    case HAND_RED:
      return [cards[2], cards[3]];
    case NEXT_CARD:
      return [cards[4]];
    default:
      return cards;
  }
};

export const cardSwapper = (
  cardNames: CardName[],
  selectedCard: CardName | undefined
): CardName[] => {
  if (selectedCard) {
    const cards = cardNames.slice();
    const indexOfSelectedCard = cards.indexOf(selectedCard);
    const indexOfSwappableCard = cards.length - 1;
    const cardToSwap = cards[indexOfSwappableCard];
    cards[indexOfSelectedCard] = cardToSwap;
    cards[indexOfSwappableCard] = selectedCard;
    return cards;
  }

  return cardNames;
};

const initialState: CardState = {
  cards: generateRandomCards(),
  selectedCard: undefined,
};

export const cardReducer = (
  state = initialState,
  action: CardActions
): CardState => {
  switch (action.type) {
    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.selectedCardName,
      };
    case SWAP_CARDS:
      const cards = cardSwapper(state.cards, state.selectedCard);
      return {
        ...state,
        cards,
        selectedCard: undefined,
      };
    default:
      return state;
  }
};
