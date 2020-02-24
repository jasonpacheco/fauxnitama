import { CardName } from '../types/cardTypes';
import { ThunkResult, AppState } from '..';
import {
  ON_CLICK_CARD,
  OnClickCardAction,
  ON_CLICK_PIECE,
  OnClickPieceAction,
  ON_CLICK_SQUARE,
  OnClickSquareAction,
} from '../types/eventTypes';
import getMoves from '../../utils/getMoves';
import { cardNameToCard } from '../../../utils';
import {
  PlayerType,
  CAPTURE_TEMPLE,
  CAPTURE_MASTER,
  EndMethod,
} from '../types/gameTypes';
import { PiecePosition, PieceTuple, MASTER } from '../types/pieceTypes';
import { pieceBelongsToPlayer, getPlayerCards, cardSwapper } from '../../utils';
import { cardReducer } from '../reducers/cardReducers';

// export const onGameInitialization = () => {};

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
    },
    pieceReducer: { piecePositions, selectedPiece },
  } = getState();

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

export const onClickPieceAction = (
  selectedPiece: PieceTuple,
  selectedCardName: CardName | '',
  stateSelectedPiece: PieceTuple | [],
  playerPiecePositions: PieceTuple[],
  isTransposable: boolean
): OnClickPieceAction | undefined => {
  const [selectedPieceID] = selectedPiece;
  /**
   * Check if the selected piece belongs to the current player
   * and dispatch if there's is no piece already in state. Prevent reselection if the
   * clicked piece is the same as the piece in state already.
   */
  if (
    stateSelectedPiece.length === 0 ||
    stateSelectedPiece[0] !== selectedPieceID
  ) {
    // If a card already exists in the state, calculate valid moves
    if (selectedCardName) {
      const validMoves = getMoves(
        selectedPieceID,
        isTransposable,
        cardNameToCard(selectedCardName).moves,
        playerPiecePositions
      );

      return { type: ON_CLICK_PIECE, selectedPiece, validMoves };
    }
    // If not, just set the clicked piece
    return { type: ON_CLICK_PIECE, selectedPiece, validMoves: [] };
  }
  return undefined;
};

const getPieceFromSquare = (
  selectedSquareID: number,
  currentPlayerPositions: PieceTuple[]
): PieceTuple | undefined =>
  currentPlayerPositions.find(pieceTuple => selectedSquareID === pieceTuple[0]);

export const onClickSquareAction = (
  currentPlayer: PlayerType | '',
  selectedPiece: PieceTuple | [],
  validMoves: number[],
  selectedSquareID: number,
  piecePositions: PiecePosition,
  halfmoves: number,
  players: PlayerType[],
  cards: CardName[],
  selectedCardName: CardName
): OnClickSquareAction | undefined => {
  const newCards = cardSwapper(cards, selectedCardName);
  if (
    currentPlayer &&
    selectedPiece.length !== 0 &&
    validMoves.includes(selectedSquareID)
  ) {
    const opponent = players[1 - players.indexOf(currentPlayer)];
    const opponentPiece = getPieceFromSquare(
      selectedSquareID,
      piecePositions[opponent]
    );

    const updatedHalfmoves = opponentPiece ? 0 : halfmoves + 1;
    const isCaptureMaster =
      opponentPiece && opponentPiece[1] === MASTER ? CAPTURE_MASTER : '';

    const isCaptureTemple =
      (currentPlayer === players[1] && selectedSquareID === 2) ||
      (currentPlayer === players[0] && selectedSquareID === 22)
        ? CAPTURE_TEMPLE
        : '';
    const endMethod = isCaptureMaster || isCaptureTemple;
    const winner = endMethod ? currentPlayer : '';
    const isGameComplete = winner ? true : false;

    return {
      type: ON_CLICK_SQUARE,
      currentPlayer,
      opponent,
      idToUpdate: selectedPiece[0],
      targetID: selectedSquareID,
      halfmoves: updatedHalfmoves,
      endMethod,
      winner,
      isGameComplete,
      cards: newCards,
    };
  }
  return undefined;
};

export const onClickSquare = (selectedSquareID: number): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { selectedCardName, cards },
    gameReducer: {
      player: { currentPlayer, players },
    },
    pieceReducer: { piecePositions, selectedPiece, validMoves, halfmoves },
  } = getState();

  const pieceFromSquare = getPieceFromSquare(
    selectedSquareID,
    piecePositions[currentPlayer]
  );

  // Fire if square clicked contains a player piece and piece clicked doesn't already exist in state
  if (pieceFromSquare && selectedPiece[0] !== selectedSquareID) {
    const clickPieceAction = onClickPieceAction(
      pieceFromSquare,
      selectedCardName,
      selectedPiece,
      piecePositions[currentPlayer],
      currentPlayer === players[0]
    );

    if (clickPieceAction) {
      dispatch(clickPieceAction);
      return;
    }
  }

  // Fire if empty square is a valid move
  const clickSquareAction = onClickSquareAction(
    currentPlayer,
    selectedPiece,
    validMoves,
    selectedSquareID,
    piecePositions,
    halfmoves,
    players,
    cards,
    selectedCardName as CardName
  );

  if (clickSquareAction) {
    dispatch(clickSquareAction);
    return;
  }

  return;
};
