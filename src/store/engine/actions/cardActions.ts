import { ThunkResult } from '../';
import { CardName } from '../../../interfaces/card.interface';
import { SELECT_CARD, CardActions, SWAP_CARDS } from '../types/cardTypes';

/**
 * Action creator called when the user selects a card for move-making.
 * @param selectedCardName 'Bear' | 'Boar' | 'Cobra' | 'Crab' | 'Crane' | 'Dog' | 'Dragon' | 'Eel' | 'Elephant' | 'Fox' | 'Frog' | 'Giraffe' | 'Goose' | 'Horse' | 'Iguana' | 'Kirin' | 'Mantis' | 'Monkey' | 'Mouse' | 'Otter' | 'Ox' | 'Panda' | 'Phoenix' | 'Rabbit' | 'Rat' | 'Rooster' | 'Sable' | 'Sea Snake' | 'Tanuki' | 'Tiger' | 'Turtle' | 'Viper';
 */
export const selectCard = (selectedCardName: CardName): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  if (getState().cardReducer.selectedCardName !== selectedCardName) {
    dispatch({
      type: SELECT_CARD,
      selectedCardName,
    });
  }
};

/**
 * Action creator called to swap the cards after the user makes a move.
 */
export const swapCards = (): CardActions => ({
  type: SWAP_CARDS,
});
