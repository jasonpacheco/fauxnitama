import { ThunkResult } from '../';
import { cardNameToCard } from '../../../utils';
import { getPlayerCards } from '../../utils';
import getMoves from '../../utils/getMoves';
import { CardName, ON_CLICK_CARD, OnClickCardAction } from '../types/cardTypes';

export const onClickCardAction = (
  selectedCardName: CardName,
  validMoves: number[]
): OnClickCardAction => ({
  type: ON_CLICK_CARD,
  selectedCardName,
  validMoves,
});

export const onClickCard = (selectedCardName: CardName): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { selectedCardName: stateSelectedCardName, cards },
    gameReducer: {
      player: { currentPlayer, players },
      properties: { isGameComplete, pauseGame },
    },
    pieceReducer: { piecePositions, selectedPiece },
  } = getState();

  if (isGameComplete || pauseGame) {
    return;
  }

  if (
    currentPlayer &&
    getPlayerCards(cards, players, currentPlayer).includes(selectedCardName)
  ) {
    if (selectedPiece.length !== 0) {
      const validMoves = getMoves(
        selectedPiece[0],
        currentPlayer === players[0],
        cardNameToCard(selectedCardName).moves,
        piecePositions[currentPlayer]
      );

      dispatch(onClickCardAction(selectedCardName, validMoves));
      return;
    }

    if (stateSelectedCardName !== selectedCardName) {
      dispatch(onClickCardAction(selectedCardName, []));
      return;
    }
  }
};
