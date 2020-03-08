import { ThunkResult } from '../engine';
import { PLAYER_AI } from '../engine/types/gameTypes';
import { CardName, ON_CLICK_CARD } from '../engine/types/cardTypes';
import getMoves from '../utils/getMoves';
import { cardNameToCard } from '../../utils';
import { ON_CLICK_PIECE } from '../engine/types/eventTypes';
import { onClickSquare } from '../engine/actions/eventActions';
import { batch } from 'react-redux';
import negamaxRoot, { GameState } from '../utils/ai/negamax';
import { PieceTuple } from '../engine/types/pieceTypes';

const smartSelectCard = (cardName: CardName): ThunkResult<void> => (
  dispatch
): void => {
  console.time('select card');
  dispatch({
    type: ON_CLICK_CARD,
    selectedCardName: cardName,
    validMoves: [],
  });
  console.timeEnd('select card');
};

const smartSelectPiece = (piece: PieceTuple): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { selectedCardName },
    pieceReducer: { piecePositions },
  } = getState();
  const aiPieces = piecePositions[PLAYER_AI];

  dispatch({
    type: ON_CLICK_PIECE,
    selectedPiece: piece,
    validMoves: getMoves(
      piece[0],
      true,
      cardNameToCard(selectedCardName as CardName).moves,
      aiPieces
    ),
  });
};

const smartMove = (moveToID: number): ThunkResult<void> => (dispatch): void => {
  dispatch(onClickSquare(moveToID));
};

export const aiRandomMove = (): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { cards },
    gameReducer: {
      player: { currentPlayer, players },
      properties: { isGameComplete },
    },
    pieceReducer: { piecePositions, halfmoves },
  } = getState();
  if (isGameComplete || currentPlayer === '') {
    return;
  }

  const gameState: GameState = JSON.parse(
    JSON.stringify({
      piecePositions,
      cards,
      currentPlayer,
      players,
      halfmoves,
    })
  );

  const promise = Promise.resolve(negamaxRoot(gameState, 4));
  promise.then(optimalMove => {
    batch(() => {
      console.log('promises made... ', optimalMove);

      dispatch(smartSelectCard(optimalMove.cardName as CardName));
      dispatch(smartSelectPiece(optimalMove.piece as PieceTuple));
      dispatch(smartMove(optimalMove.moveToID as number));
    });
  });
};
