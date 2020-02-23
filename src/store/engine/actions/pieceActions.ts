import { ThunkResult } from '../';
import { cardNameToCard } from '../../../utils';
import getMoves from '../../utils/getMoves';
import { PlayerType } from '../types/gameTypes';
import {
  PieceActions,
  INCREMENT_HALFMOVE,
  RESET_HALFMOVE,
  INITIALIZE_PIECE_POSITIONS,
  ADD_VALID_MOVES,
  UPDATE_POSITION,
  REMOVE_PIECE,
} from '../types/pieceTypes';

/**
 * Action to increment halfmove counter. A halfmove in this implementation is defined
 * as a one-ply move that does not produce a capture. A pass automatically increases
 * the counter.
 */
export const incrementHalfmove = (): PieceActions => ({
  type: INCREMENT_HALFMOVE,
});

/**
 * Action that resets halfmove counter. Counter is reset when a move makes a capture.
 */
export const resetHalfmove = (): PieceActions => ({
  type: RESET_HALFMOVE,
});

/** Actions called inside Thunks */

export const initializePiecePositionsAction = (
  players: PlayerType[]
): PieceActions => ({
  type: INITIALIZE_PIECE_POSITIONS,
  players,
});

export const addValidMovesAction = (validMoves: number[]): PieceActions => ({
  type: ADD_VALID_MOVES,
  validMoves,
});

export const updatePositionAction = (
  playerToUpdate: PlayerType,
  pieceToUpdateID: number,
  newLocationID: number
): PieceActions => ({
  type: UPDATE_POSITION,
  playerToUpdate,
  pieceToUpdateID,
  newLocationID,
});

export const removePieceAction = (
  playerToUpdate: PlayerType,
  pieceToRemoveID: number
): PieceActions => ({
  type: REMOVE_PIECE,
  playerToUpdate,
  pieceToRemoveID,
});

/** Thunks */
/**
 * Action that results initializes the pieces' positions with respect to player names.
 */
export const initializePiecePositions = (): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const { players } = getState().gameReducer.player;
  dispatch(initializePiecePositionsAction(players));
};

/**
 * Adds valid moves
 */
export const addValidMoves = (): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { selectedCardName },
    gameReducer: {
      player: { currentPlayer, players },
    },
    pieceReducer: { piecePositions, selectedPiece },
  } = getState();

  if (!currentPlayer) {
    console.log('No player selected.');
    return;
  }

  const currentPlayerPositions = piecePositions[currentPlayer];

  if (
    !selectedCardName ||
    selectedPiece.length === 0 ||
    !currentPlayerPositions
  ) {
    console.log(
      'No card to provide a move set and/or no piece selected or pieces found.'
    );
    return;
  }

  const validMoves = getMoves(
    selectedPiece[0],
    currentPlayer === players[0],
    cardNameToCard(selectedCardName).moves,
    currentPlayerPositions
  );

  dispatch(addValidMovesAction(validMoves));
};

export const movePiece = (clickedCellID: number): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  // if the requested piece id is in the set of valid moves, update
  // if the requested piece id also in the
};
