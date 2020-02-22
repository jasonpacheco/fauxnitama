import * as Types from '../../../types/gameTypes';
import { playerReducer } from '../../../reducers/gameReducers';

describe('tests for SET_GAME_TYPE', () => {
  const initialState: Types.PlayerState = {
    currentPlayer: undefined,
    gameType: undefined,
    players: [],
  };

  test('it sets a game type of SINGLE_PLAYER', () => {
    expect(
      playerReducer(initialState, {
        type: Types.SET_GAME_TYPE,
        gameType: Types.SINGLE_PLAYER,
      })
    ).toEqual({ ...initialState, gameType: Types.SINGLE_PLAYER });
  });

  test('it sets a game type of LOCAL_MULTIPLAYER', () => {
    expect(
      playerReducer(initialState, {
        type: Types.SET_GAME_TYPE,
        gameType: Types.LOCAL_MULTIPLAYER,
      })
    ).toEqual({ ...initialState, gameType: Types.LOCAL_MULTIPLAYER });
  });

  test('it sets a game type of ONLINE_MULTIPLAYER', () => {
    expect(
      playerReducer(initialState, {
        type: Types.SET_GAME_TYPE,
        gameType: Types.ONLINE_MULTIPLAYER,
      })
    ).toEqual({ ...initialState, gameType: Types.ONLINE_MULTIPLAYER });
  });
});
