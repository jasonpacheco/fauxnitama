import * as CardTypes from './types';
import { generateRandomCards, cardSwapper } from '../../utils';

const initialState: CardTypes.CardState = {
  cards: generateRandomCards(),
  selectedCard: undefined,
};

export const cardReducer = (
  state = initialState,
  action: CardTypes.CardActions
): CardTypes.CardState => {
  switch (action.type) {
    case CardTypes.SELECT_CARD:
      return {
        ...state,
        selectedCard: action.selectedCardName,
      };
    case CardTypes.SWAP_CARDS:
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
