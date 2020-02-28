import { generateRandomCards, cardSwapper } from '../../utils';
import {
  CardActions,
  CardState,
  SELECT_CARD,
  SWAP_CARDS,
} from '../types/cardTypes';
import {
  ON_CLICK_CARD,
  OnClickCardAction,
  OnClickSquareAction,
  ON_CLICK_SQUARE,
} from '../types/eventTypes';
import {
  OnClickButtonYesRestart,
  ON_CLICK_BUTTON_YES_RESTART,
  OnClickButtonPass,
  ON_CLICK_BUTTON_PASS,
} from '../types/buttonTypes';

const initialState: CardState = {
  cards: generateRandomCards(),
  selectedCardName: '',
};

export const cardReducer = (
  state = initialState,
  action:
    | CardActions
    | OnClickCardAction
    | OnClickSquareAction
    | OnClickButtonYesRestart
    | OnClickButtonPass
): CardState => {
  switch (action.type) {
    case ON_CLICK_BUTTON_PASS:
      return {
        ...state,
        selectedCardName: '',
      };
    case ON_CLICK_BUTTON_YES_RESTART:
      return {
        ...state,
        cards: action.cards,
        selectedCardName: '',
      };
    case SELECT_CARD:
      return {
        ...state,
        selectedCardName: action.selectedCardName,
      };
    case SWAP_CARDS:
      if (state.selectedCardName) {
        const cards = cardSwapper(state.cards, state.selectedCardName);
        return {
          ...state,
          cards,
          selectedCardName: '',
        };
      }
      return {
        ...state,
      };

    case ON_CLICK_CARD:
      return {
        ...state,
        selectedCardName: action.selectedCardName,
      };
    case ON_CLICK_SQUARE:
      return {
        ...state,
        cards: action.cards,
        selectedCardName: '',
      };
    default:
      return state;
  }
};
