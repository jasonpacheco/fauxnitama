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

const wait = (ms: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
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

export const moveToRandomSquare = (): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    pieceReducer: { validMoves },
  } = getState();
  const randomSquareID = sampleSize(validMoves, 1);
  dispatch(onClickSquare(randomSquareID[0]));
};

export const selectPiece = (): ThunkResult<void> => (
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
    gameReducer: {
      properties: { isGameComplete },
    },
  } = getState();
  if (isGameComplete) {
    return;
  }
  batch(() => {
    dispatch(selectRandomCard());
    dispatch(selectPiece());
    wait(1000).then(() => {
      dispatch(moveToRandomSquare());
    });
  });
};
