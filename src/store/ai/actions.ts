import { ThunkResult } from '../engine';
import { getPlayerCards } from '../utils';
import { PLAYER_AI } from '../engine/types/gameTypes';
import random from 'lodash.random';
import { SELECT_CARD, CardName } from '../engine/types/cardTypes';
import getMoves from '../utils/getMoves';
import { cardNameToCard } from '../../utils';
import range from 'lodash.range';
import sampleSize from 'lodash.samplesize';
import { ON_CLICK_PIECE } from '../engine/types/eventTypes';
import { onClickSquare } from '../engine/actions/eventActions';
import { batch } from 'react-redux';
import negamaxRoot, { GameState } from '../utils/ai/negamax';
import { PieceTuple } from '../engine/types/pieceTypes';

const wait = (ms: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const smartSelectCard = (cardName: CardName): ThunkResult<void> => (
  dispatch
): void => {
  dispatch({
    type: SELECT_CARD,
    selectedCardName: cardName,
  });
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

export const selectRandomCard = (cardName?: CardName): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { cards },
    gameReducer: {
      player: { players },
    },
  } = getState();
  const aiCards = getPlayerCards(cards, players, PLAYER_AI);
  const randomIndex = random(0, 1);

  dispatch({
    type: SELECT_CARD,
    selectedCardName: cardName ? cardName : aiCards[randomIndex],
  });
};

export const moveToRandomSquare = (
  overrideMoveID?: number
): ThunkResult<void> => (dispatch, getState): void => {
  const {
    pieceReducer: { validMoves },
  } = getState();
  const randomSquareID = sampleSize(validMoves, 1);
  dispatch(onClickSquare(overrideMoveID ? overrideMoveID : randomSquareID[0]));
};

export const selectPiece = (overridePiece?: PieceTuple): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { selectedCardName, cards },
    pieceReducer: { piecePositions },
    gameReducer: {
      player: { players },
    },
  } = getState();
  const aiPieces = piecePositions[PLAYER_AI];

  if (overridePiece) {
    dispatch({
      type: ON_CLICK_PIECE,
      selectedPiece: overridePiece,
      validMoves: getMoves(
        overridePiece[0],
        true,
        cardNameToCard(selectedCardName as CardName).moves,
        aiPieces
      ),
    });
  }

  const randomIndices = sampleSize(range(aiPieces.length), aiPieces.length);
  let index = 0;
  let validMoves: number[] = [];
  randomIndices.some(randomIndex => {
    validMoves = [
      ...getMoves(
        aiPieces[randomIndex][0],
        true,
        cardNameToCard(selectedCardName as CardName).moves,
        aiPieces
      ),
    ];

    if (validMoves.length > 0) {
      index = randomIndex;
      return true;
    }
    return false;
  });

  if (validMoves.length === 0) {
    const aiCards = getPlayerCards(cards, players, PLAYER_AI);
    const index = aiCards.indexOf(selectedCardName as CardName);
    batch(() => {
      dispatch(selectRandomCard(aiCards[1 - index]));
      dispatch(selectPiece());
    });
  } else {
    dispatch({
      type: ON_CLICK_PIECE,
      selectedPiece: aiPieces[index],
      validMoves,
    });
  }
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

      console.log('...promises kept');
      dispatch(smartSelectCard(optimalMove.cardName as CardName));
      dispatch(smartSelectPiece(optimalMove.piece as PieceTuple));
      dispatch(smartMove(optimalMove.moveToID as number));
    });
  });
};
