import * as Types from '../types/pieceTypes';
import * as GameTypes from '../types/gameTypes';
import { ThunkResult } from '../';
import { cardNameToCard } from '../../../utils';
import getMoves from '../../utils/getMoves';

/**
 * Action to increment halfmove counter. A halfmove in this implementation is defined
 * as a one-ply move that does not produce a capture. A pass automatically increases
 * the counter.
 */
export const incrementHalfmove = (): Types.PieceActions => ({
  type: Types.INCREMENT_HALFMOVE,
});

/**
 * Action that resets halfmove counter. Counter is reset when a move makes a capture.
 */
export const resetHalfmove = (): Types.PieceActions => ({
  type: Types.RESET_HALFMOVE,
});

/** Actions called inside Thunks */

export const initializePiecePositionsAction = (
  players: GameTypes.PlayerType[]
): Types.PieceActions => ({
  type: Types.INITIALIZE_PIECE_POSITIONS,
  players,
});

export const addValidMovesAction = (
  validMoves: number[]
): Types.PieceActions => ({
  type: Types.ADD_VALID_MOVES,
  validMoves,
});

export const updatePositionAction = (
  playerToUpdate: GameTypes.PlayerType,
  pieceToUpdateID: number,
  newLocationID: number
): Types.PieceActions => ({
  type: Types.UPDATE_POSITION,
  playerToUpdate,
  pieceToUpdateID,
  newLocationID,
});

export const removePieceAction = (
  playerToUpdate: GameTypes.PlayerType,
  pieceToRemoveID: number
): Types.PieceActions => ({
  type: Types.REMOVE_PIECE,
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
  const { players } = getState().game.player;
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
    card: { selectedCard },
    game: {
      player: { currentPlayer, players },
    },
    piece: { piecePositions, selectedPiece },
  } = getState();

  if (!currentPlayer) {
    console.log('No player selected.');
    return;
  }

  const currentPlayerPositions = piecePositions[currentPlayer];

  if (!selectedCard || !selectedPiece || !currentPlayerPositions) {
    console.log(
      'No card to provide a move set and/or no piece selected or pieces found.'
    );
    return;
  }

  const validMoves = getMoves(
    selectedPiece[0],
    currentPlayer === players[0],
    cardNameToCard(selectedCard).moves,
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
