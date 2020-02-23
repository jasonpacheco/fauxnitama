import { playerReducer } from '../../../reducers/gameReducers';
import {
  PlayerState,
  SET_GAME_TYPE,
  SINGLE_PLAYER,
  SET_PLAYERS,
  PLAYER_BLUE,
  PLAYER_AI,
  PLAYER_RED,
  LOCAL_MULTIPLAYER,
  ONLINE_MULTIPLAYER,
} from '../../../types/gameTypes';

describe('tests for SET_PLAYERS', () => {
  const initialState: PlayerState = {
    currentPlayer: '',
    gameType: '',
    players: [],
  };

  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    const stateAfterSinglePlayer = playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: SINGLE_PLAYER,
    });

    expect(
      playerReducer(stateAfterSinglePlayer, {
        type: SET_PLAYERS,
        player: PLAYER_BLUE,
      })
    ).toEqual({
      ...stateAfterSinglePlayer,
      players: [PLAYER_AI, PLAYER_BLUE],
    });
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    const stateAfterSinglePlayer = playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: SINGLE_PLAYER,
    });

    expect(
      playerReducer(stateAfterSinglePlayer, {
        type: SET_PLAYERS,
        player: PLAYER_RED,
      })
    ).toEqual({
      ...stateAfterSinglePlayer,
      players: [PLAYER_AI, PLAYER_RED],
    });
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    const stateAfterLocalMultiplayer = playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: LOCAL_MULTIPLAYER,
    });

    expect(
      playerReducer(stateAfterLocalMultiplayer, {
        type: SET_PLAYERS,
      })
    ).toEqual({
      ...stateAfterLocalMultiplayer,
      players: [PLAYER_BLUE, PLAYER_RED],
    });
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    const stateAfterOnlineMultiplayer = playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: ONLINE_MULTIPLAYER,
    });

    expect(
      playerReducer(stateAfterOnlineMultiplayer, {
        type: SET_PLAYERS,
      })
    ).toEqual({
      ...stateAfterOnlineMultiplayer,
      players: [PLAYER_BLUE, PLAYER_RED],
    });
  });
});
