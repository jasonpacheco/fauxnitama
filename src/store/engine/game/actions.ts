import * as Types from './types';
import { ThunkResult } from '../';

/**
 * Action to fire when a game type is set.
 * @param gameType SINGLE_PLAYER | LOCAL_MULTIPLAYER | ONLINE_MULTIPLAYER
 */
export const setGameType = (gameType: Types.GameType): Types.PlayerActions => ({
  type: Types.SET_GAME_TYPE,
  gameType,
});

/**
 * Action to increment halfmove counter. A halfmove in this implementation is defined
 * as a one-ply move that does not produce a capture. A pass automatically increases
 * the counter.
 */
export const incrementHalfmove = (): Types.PropertiesActions => ({
  type: Types.INCREMENT_HALFMOVE,
});

/**
 * Action that resets halfmove counter. Counter is reset when a move makes a capture.
 */
export const resetHalfmove = (): Types.PropertiesActions => ({
  type: Types.RESET_HALFMOVE,
});

/**
 * Action to pause/unpause the game.
 */
export const setPauseGame = (): Types.PropertiesActions => ({
  type: Types.SET_PAUSE_GAME,
});

/**
 * Action to add move to game history. A move is string array split by its tokens.
 * @param move Array<string> split into 5 tokens.
 */
export const addToHistory = (move: string[]): Types.PropertiesActions => ({
  type: Types.ADD_TO_HISTORY,
  move,
});

/**
 * Action to fire when the game is over.
 */
export const setGameIsComplete = (): Types.PropertiesActions => ({
  type: Types.SET_IS_GAME_COMPLETE,
});

/**
 * Action to fire to provide metadata about the game's finish.
 * @param winner PLAYER_AI | PLAYER_BLUE | PLAYER_RED
 * @param endMethod CAPTURE_MASTER | CAPTURE_TEMPLE | DRAW
 */
export const setWinnerByEndMethod = (
  winner: Types.PlayerType,
  endMethod: Types.EndMethod
): Types.GameActions => ({
  type: Types.SET_WINNER_BY_END_METHOD,
  winner,
  endMethod,
});

/** Actions fired inside Thunks */
const setCurrentPlayerAction = (
  firstPlayer?: typeof Types.PLAYER_BLUE | typeof Types.PLAYER_RED
): Types.PlayerActions => ({
  type: Types.SET_CURRENT_PLAYER,
  firstPlayer,
});

const setPlayersAction = (
  player?: typeof Types.PLAYER_BLUE | typeof Types.PLAYER_RED
): Types.PlayerActions => ({
  type: Types.SET_PLAYERS,
  player,
});

/** Thunks */

/**
 * Action to fire to set the next player. When the game is initialized, the firstPlayer
 * parameter is set to either PLAYER_BLUE or PLAYER_RED (which is determined by the
 * stamp color of the 5th card in the players array). All other times this action is
 * fired, firstPlayer is undefined.
 * @param firstPlayer PLAYER_BLUE | PLAYER_RED | undefined
 */
export const setCurrentPlayer = (
  firstPlayer?: typeof Types.PLAYER_BLUE | typeof Types.PLAYER_RED
): ThunkResult<void> => (dispatch, getState): void => {
  const { players, currentPlayer } = getState().game.player;

  if (players.length === 0) {
    console.log('Cannot set a player if players property is empty.');
    return;
  }

  if (currentPlayer === undefined && firstPlayer === undefined) {
    console.log(
      'Cannot set current player without a specifying a first player.'
    );
    return;
  } else {
    dispatch(setCurrentPlayerAction(firstPlayer));
  }
};

/**
 * Action to set initial players. Takes in a player parameter which is set only by a
 * single-player game, and the player will be the user-selected color.
 * @param player PLAYER_BLUE | PLAYER_RED
 */
export const setPlayers = (
  player?: typeof Types.PLAYER_BLUE | typeof Types.PLAYER_RED
): ThunkResult<void> => (dispatch, getState): void => {
  const { gameType } = getState().game.player;
  if (gameType === undefined) {
    console.log('Cannot set players if gameType is undefined');
  } else if (player === undefined) {
    console.log('A player must be set for a single player game.');
  }
  if (gameType === Types.SINGLE_PLAYER && player) {
    dispatch(setPlayersAction(player));
  }
};
