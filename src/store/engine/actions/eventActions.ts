import { CardName } from '../types/cardTypes';
import { ThunkResult } from '..';
import {
  ON_CLICK_CARD,
  OnClickCardAction,
  ON_CLICK_PIECE,
  OnClickPieceAction,
} from '../types/eventTypes';
import getMoves from '../../utils/getMoves';
import { cardNameToCard } from '../../../utils';
import { PlayerType } from '../types/gameTypes';
import { PiecePosition, PieceTuple } from '../types/pieceTypes';

// export const onGameInitialization = () => {};

export const onClickCardAction = (
  selectedCardName: CardName,
  validMoves: number[]
): OnClickCardAction => ({
  type: ON_CLICK_CARD,
  selectedCardName,
  validMoves,
});

export const onClickPieceAction = (
  selectedPiece: PieceTuple,
  validMoves: number[]
): OnClickPieceAction => ({
  type: ON_CLICK_PIECE,
  selectedPiece,
  validMoves,
});

export const onClickCard = (selectedCardName: CardName): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const { selectedPiece, piecePositions } = getState().pieceReducer;
  const { currentPlayer, players } = getState().gameReducer.player;
  const stateSelectedCardName = getState().cardReducer.selectedCardName;

  if (selectedPiece.length !== 0) {
    const validMoves = getMoves(
      selectedPiece[0],
      currentPlayer === players[0],
      cardNameToCard(selectedCardName).moves,
      piecePositions[currentPlayer]
    );

    dispatch(onClickCardAction(selectedCardName, validMoves));
  }

  if (stateSelectedCardName !== selectedCardName) {
    dispatch(onClickCardAction(selectedCardName, []));
  }
};

const pieceBelongsToPlayer = (
  currentPlayer: PlayerType,
  piecePositions: PiecePosition,
  pieceID: number
): boolean => piecePositions[currentPlayer].some(([id]) => id === pieceID);

export const onClickPiece = (selectedPiece: PieceTuple): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const { currentPlayer, players } = getState().gameReducer.player;
  const { selectedCardName } = getState().cardReducer;
  const {
    selectedPiece: stateSelectedPiece,
    piecePositions,
  } = getState().pieceReducer;
  const [selectedPieceID] = selectedPiece;
  /**
   * Check if the selected piece belongs to the current player
   * and dispatch if there's is no piece already in state. Prevent reselection if the
   * clicked piece is the same as the piece in state already.
   */
  if (
    currentPlayer &&
    (stateSelectedPiece.length === 0 ||
      stateSelectedPiece[0] !== selectedPieceID) &&
    pieceBelongsToPlayer(currentPlayer, piecePositions, selectedPieceID)
  ) {
    if (selectedCardName) {
      const validMoves = getMoves(
        selectedPieceID,
        currentPlayer === players[0],
        cardNameToCard(selectedCardName).moves,
        piecePositions[currentPlayer]
      );

      dispatch(onClickPieceAction(selectedPiece, validMoves));
    }
    dispatch(onClickPieceAction(selectedPiece, []));
  }
};
