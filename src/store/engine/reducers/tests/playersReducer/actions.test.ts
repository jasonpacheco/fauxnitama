/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-nocheck

import {
  setGameType,
  setCurrentPlayer,
  setPlayers,
} from '../../../actions/gameActions';
import { playerReducer } from '../../../reducers/gameReducers';
import mockStore from '../../../mockStore';
import { rootReducer } from '../../../index';
import {
  PlayerState,
  SINGLE_PLAYER,
  PLAYER_BLUE,
  PLAYER_RED,
  PLAYER_AI,
} from '../../../types/gameTypes';

describe('tests for playersReducer actions', () => {
  const initialState: PlayerState = {
    gameType: '',
    currentPlayer: '',
    players: [],
  };

  test('it sets the game type', () => {
    const state1 = playerReducer(initialState, setGameType(SINGLE_PLAYER));
    expect(state1).toEqual({
      ...state1,
      gameType: SINGLE_PLAYER,
    });
  });

  describe('test for setting current player', () => {
    const createState = initialState => actions =>
      actions.reduce(rootReducer, initialState);
    const initialState = createState({
      gameReducer: {
        player: {
          gameType: '',
          currentPlayer: '',
          players: [],
        },
      },
    });

    test('it sets the current player', async () => {
      const store = mockStore(initialState);
      await store.dispatch(setGameType(SINGLE_PLAYER));
      expect(store.getState().gameReducer.player.gameType).toEqual(
        SINGLE_PLAYER
      );
      await store.dispatch(setPlayers());
      expect(store.getState().gameReducer.player.players).toEqual([]);
      await store.dispatch(setCurrentPlayer(PLAYER_BLUE));
      expect(store.getState().gameReducer.player.currentPlayer).toEqual('');
      await store.dispatch(setPlayers(PLAYER_RED));
      expect(store.getState().gameReducer.player.players).toEqual([
        PLAYER_AI,
        PLAYER_RED,
      ]);
      await store.dispatch(setCurrentPlayer(PLAYER_BLUE));
      expect(store.getState().gameReducer.player.currentPlayer).toEqual(
        PLAYER_AI
      );
    });
  });
});
