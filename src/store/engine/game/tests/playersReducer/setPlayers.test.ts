import * as Types from '../../types';
import { playerReducer } from '../../reducers';

describe('tests for SET_PLAYERS', () => {
  const initialState: Types.PlayerState = {
    currentPlayer: undefined,
    gameType: undefined,
    players: [],
  };

  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    const stateAfterSinglePlayer = playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.SINGLE_PLAYER,
    });

    expect(
      playerReducer(stateAfterSinglePlayer, {
        type: Types.SET_PLAYERS,
        player: Types.PLAYER_BLUE,
      })
    ).toEqual({
      ...stateAfterSinglePlayer,
      players: [Types.PLAYER_AI, Types.PLAYER_BLUE],
    });
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    const stateAfterSinglePlayer = playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.SINGLE_PLAYER,
    });

    expect(
      playerReducer(stateAfterSinglePlayer, {
        type: Types.SET_PLAYERS,
        player: Types.PLAYER_RED,
      })
    ).toEqual({
      ...stateAfterSinglePlayer,
      players: [Types.PLAYER_AI, Types.PLAYER_RED],
    });
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    const stateAfterLocalMultiplayer = playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.LOCAL_MULTIPLAYER,
    });

    expect(
      playerReducer(stateAfterLocalMultiplayer, {
        type: Types.SET_PLAYERS,
      })
    ).toEqual({
      ...stateAfterLocalMultiplayer,
      players: [Types.PLAYER_BLUE, Types.PLAYER_RED],
    });
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    const stateAfterOnlineMultiplayer = playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.ONLINE_MULTIPLAYER,
    });

    expect(
      playerReducer(stateAfterOnlineMultiplayer, {
        type: Types.SET_PLAYERS,
      })
    ).toEqual({
      ...stateAfterOnlineMultiplayer,
      players: [Types.PLAYER_BLUE, Types.PLAYER_RED],
    });
  });
});
