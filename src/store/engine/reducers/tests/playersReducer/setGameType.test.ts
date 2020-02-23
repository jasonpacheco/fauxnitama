import { playerReducer } from '../../../reducers/gameReducers';
import {
  PlayerState,
  SET_GAME_TYPE,
  SINGLE_PLAYER,
  LOCAL_MULTIPLAYER,
  ONLINE_MULTIPLAYER,
} from '../../../types/gameTypes';

describe('tests for SET_GAME_TYPE', () => {
  const initialState: PlayerState = {
    currentPlayer: '',
    gameType: '',
    players: [],
  };

  test('it sets a game type of SINGLE_PLAYER', () => {
    expect(
      playerReducer(initialState, {
        type: SET_GAME_TYPE,
        gameType: SINGLE_PLAYER,
      })
    ).toEqual({ ...initialState, gameType: SINGLE_PLAYER });
  });

  test('it sets a game type of LOCAL_MULTIPLAYER', () => {
    expect(
      playerReducer(initialState, {
        type: SET_GAME_TYPE,
        gameType: LOCAL_MULTIPLAYER,
      })
    ).toEqual({ ...initialState, gameType: LOCAL_MULTIPLAYER });
  });

  test('it sets a game type of ONLINE_MULTIPLAYER', () => {
    expect(
      playerReducer(initialState, {
        type: SET_GAME_TYPE,
        gameType: ONLINE_MULTIPLAYER,
      })
    ).toEqual({ ...initialState, gameType: ONLINE_MULTIPLAYER });
  });
});
