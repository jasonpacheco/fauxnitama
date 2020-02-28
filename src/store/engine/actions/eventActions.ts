import { CardName } from '../types/cardTypes';
import { ThunkResult } from '..';
import {
  ON_CLICK_CARD,
  OnClickCardAction,
  ON_CLICK_PIECE,
  OnClickPieceAction,
  ON_CLICK_SQUARE,
  OnClickSquareAction,
  ON_GAME_INITIALIZATION,
  OnGameInitializationAction,
} from '../types/eventTypes';
import getMoves from '../../utils/getMoves';
import { cardNameToCard } from '../../../utils';
import {
  PlayerType,
  CAPTURE_TEMPLE,
  CAPTURE_MASTER,
  GameType,
  PLAYER_BLUE,
  PLAYER_RED,
  LOCAL_MULTIPLAYER,
  Colors,
  PLAYER_AI,
  RED,
  BLUE,
  DRAW,
} from '../types/gameTypes';
import { PiecePosition, PieceTuple, MASTER } from '../types/pieceTypes';
import { getPlayerCards, cardSwapper, setPlayersByGameType } from '../../utils';
import { moveNotation } from '../../../interactive/notation';
import {
  TEMPLE_ID_P1,
  TEMPLE_ID_P2,
  HALFMOVE_LIMIT,
} from '../../../utils/constants';

export const onGameInitializationAction = (
  gameType: GameType,
  players: PlayerType[],
  firstPlayer: PlayerType,
  colors: Colors[]
): OnGameInitializationAction => ({
  type: ON_GAME_INITIALIZATION,
  gameType,
  players,
  firstPlayer,
  colors,
});

export const onGameInitialization = (
  gameType = LOCAL_MULTIPLAYER as GameType,
  selectedPlayer = PLAYER_BLUE as PlayerType
): ThunkResult<void> => (dispatch, getState): void => {
  const {
    cardReducer: { cards },
  } = getState();
  const firstPlayerColor = cardNameToCard(cards[4]).stamp;

  const firstPlayer = firstPlayerColor === 'Blue' ? PLAYER_BLUE : PLAYER_RED;

  const players = setPlayersByGameType(gameType, selectedPlayer);
  const colors: Colors[] =
    players[0] === PLAYER_AI
      ? players[1] === PLAYER_BLUE
        ? [RED, BLUE]
        : [BLUE, RED]
      : ([players[0].slice(7), players[1].slice(7)] as Colors[]);
  dispatch(onGameInitializationAction(gameType, players, firstPlayer, colors));
  return;
};

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
      properties: { isGameComplete },
    },
    pieceReducer: { piecePositions, selectedPiece },
  } = getState();

  if (isGameComplete) {
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
  selectedCardName: CardName,
  colors: Colors[]
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
    const halfmovesLimit = HALFMOVE_LIMIT;

    const updatedHalfmoves = opponentPiece ? 0 : halfmoves + 1;

    const isCaptureMaster =
      opponentPiece && opponentPiece[1] === MASTER ? CAPTURE_MASTER : '';

    const isCaptureTemple =
      ((currentPlayer === players[1] && selectedSquareID === TEMPLE_ID_P1) ||
        (currentPlayer === players[0] && selectedSquareID === TEMPLE_ID_P2)) &&
      selectedPiece[1] === MASTER
        ? CAPTURE_TEMPLE
        : '';

    const endMethod =
      isCaptureMaster ||
      isCaptureTemple ||
      (updatedHalfmoves === halfmovesLimit ? DRAW : '');

    const winner = endMethod && endMethod !== DRAW ? currentPlayer : '';

    const isGameComplete = endMethod ? true : false;

    const playerColor = currentPlayer.includes(colors[0])
      ? colors[0]
      : colors[1];

    const capturedPieceType = opponentPiece && opponentPiece[1];

    const notation = moveNotation(
      playerColor,
      false,
      opponentPiece !== undefined,
      selectedCardName,
      selectedPiece[1],
      selectedPiece[0],
      selectedSquareID,
      capturedPieceType,
      isCaptureTemple === CAPTURE_TEMPLE
    );

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
      move: notation,
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
      player: { currentPlayer, players, colors },
      properties: { isGameComplete },
    },
    pieceReducer: { piecePositions, selectedPiece, validMoves, halfmoves },
  } = getState();

  if (isGameComplete) {
    return;
  }

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
    }
    return;
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
    selectedCardName as CardName,
    colors
  );

  if (clickSquareAction) {
    dispatch(clickSquareAction);
  }

  return;
};
