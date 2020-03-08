import { generateRandomCards } from '../../utils';
import {
  ON_CLICK_BUTTON_PASS,
  ON_CLICK_BUTTON_YES_RESTART,
  OnClickButtonPass,
  OnClickButtonYesRestart,
} from '../types/buttonTypes';
import { CardActions, CardState, ON_CLICK_CARD } from '../types/cardTypes';
import { ON_CLICK_SQUARE, OnClickSquareAction } from '../types/eventTypes';

const initialState: CardState = {
  cards: generateRandomCards(),
  selectedCardName: '',
};

export const cardReducer = (
  state = initialState,
  action:
    | CardActions
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
