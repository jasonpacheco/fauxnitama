import * as Types from './types';
import { ThunkResult } from '../';

/**
 * Action creator called when the user selects a card for move-making.
 * @param selectedCardName 'Boar' | 'Cobra' | 'Crab' | 'Crane' | 'Dragon'
 *  | 'Eel' | 'Elephant' | 'Frog' | 'Goose' | 'Horse' | 'Mantis' |
 * 'Monkey' | 'Ox' | 'Rabbit' | 'Rooster' | 'Tiger'
 */
export const selectCard = (
  selectedCardName: Types.CardName
): ThunkResult<void> => (dispatch, getState): void => {
  if (getState().card.selectedCard !== selectedCardName) {
    dispatch({
      type: Types.SELECT_CARD,
      selectedCardName,
    });
  }
};

/**
 * Action creator called to swap the cards after the user makes a move.
 */
export const swapCards = (): Types.CardActions => ({
  type: Types.SWAP_CARDS,
});
