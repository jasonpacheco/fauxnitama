import { SELECT_CARD, SWAP_CARDS, CardActions } from './types';
import { CardName } from './types';
import { AppState } from '../';
import { ThunkAction } from 'redux-thunk';

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, CardActions>;

/**
 * Action creator called when the user selects a card for move-making
 * @param selectedCardName 'Boar' | 'Cobra' | 'Crab' | 'Crane' | 'Dragon' | 'Eel' | 'Elephant' | 'Frog' | 'Goose' | 'Horse' | 'Mantis' | 'Monkey' | 'Ox' | 'Rabbit' | 'Rooster' | 'Tiger'
 */
export const selectCard = (selectedCardName: CardName): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  if (getState().card.selectedCard !== selectedCardName) {
    dispatch({
      type: SELECT_CARD,
      selectedCardName,
    });
  }
};

/**
 * Action creator called to swap the cards after the user makes a move
 */
export const swapCards = (): CardActions => ({
  type: SWAP_CARDS,
});
