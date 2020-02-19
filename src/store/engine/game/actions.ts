import * as Types from './types';
import { ThunkResult } from '../';

/**
 * Action to fire when a game type is set.
 * @param gameType SINGLE_PLAYER | LOCAL_MULTIPLAYER | ONLINE_MULTIPLAYER
 */
export const setGameType = (gameType: Types.GameType): Types.GameActions => ({
  type: Types.SET_GAME_TYPE,
  gameType,
});

/** Actions fired inside Thunks */
const setCurrentPlayerAction = (
  firstPlayer?: typeof Types.PLAYER_BLUE | typeof Types.PLAYER_RED
): Types.GameActions => ({
  type: Types.SET_CURRENT_PLAYER,
  firstPlayer,
});

const setPlayersAction = (player?: Types.PlayerType): Types.GameActions => ({
  type: Types.SET_PLAYERS,
  player,
});

/** Thunks */

/**
 * Action to fire to set the next player. When game is initialized, the firstPlayer parameter is set to either PLAYER_BLUE or PLAYER_RED (which is determined by the stamp color of the 5th card in the players array). All other times this action is fired, firstPlayer is undefined.
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

export const setPlayers = (player?: Types.PlayerType): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const { gameType } = getState().game.player;
  if (gameType === undefined) {
    console.log('Cannot set players if gameType is undefined');
  }

  dispatch(setPlayersAction(player));
};
