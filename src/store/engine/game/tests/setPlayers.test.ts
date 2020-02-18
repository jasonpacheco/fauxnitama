import * as types from '../types';
import { gameReducer } from '../reducers';

describe('tests for SET_PLAYERS', () => {
  const initialState: types.GameState = {
    currentPlayer: undefined,
    endMethod: undefined,
    gameType: undefined,
    halfmoves: 0,
    history: [],
    isGameComplete: false,
    pauseGame: false,
    players: [],
    winner: undefined,
  };

  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    const stateAfterSinglePlayer = gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.SINGLE_PLAYER,
    });

    expect(
      gameReducer(stateAfterSinglePlayer, {
        type: types.SET_PLAYERS,
        player: types.PLAYER_BLUE,
      })
    ).toEqual({
      ...stateAfterSinglePlayer,
      players: [types.PLAYER_AI, types.PLAYER_BLUE],
    });
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    const stateAfterSinglePlayer = gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.SINGLE_PLAYER,
    });

    expect(
      gameReducer(stateAfterSinglePlayer, {
        type: types.SET_PLAYERS,
        player: types.PLAYER_RED,
      })
    ).toEqual({
      ...stateAfterSinglePlayer,
      players: [types.PLAYER_AI, types.PLAYER_RED],
    });
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    const stateAfterLocalMultiplayer = gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.LOCAL_MULTIPLAYER,
    });

    expect(
      gameReducer(stateAfterLocalMultiplayer, {
        type: types.SET_PLAYERS,
      })
    ).toEqual({
      ...stateAfterLocalMultiplayer,
      players: [types.PLAYER_BLUE, types.PLAYER_RED],
    });
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    const stateAfterOnlineMultiplayer = gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.ONLINE_MULTIPLAYER,
    });

    expect(
      gameReducer(stateAfterOnlineMultiplayer, {
        type: types.SET_PLAYERS,
      })
    ).toEqual({
      ...stateAfterOnlineMultiplayer,
      players: [types.PLAYER_BLUE, types.PLAYER_RED],
    });
  });
});
