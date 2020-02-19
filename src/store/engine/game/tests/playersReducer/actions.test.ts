/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-nocheck

import * as Types from '../../types';
import { setGameType, setCurrentPlayer, setPlayers } from '../../actions';
import { playerReducer } from '../../reducers';
import mockStore from '../../../mockStore';
import { rootReducer } from '../../../';

describe('tests for playersReducer actions', () => {
  const initialState: Types.PlayerState = {
    gameType: undefined,
    currentPlayer: undefined,
    players: [],
  };

  test('it sets the game type', () => {
    const state1 = playerReducer(
      initialState,
      setGameType(Types.SINGLE_PLAYER)
    );
    expect(state1).toEqual({
      ...state1,
      gameType: Types.SINGLE_PLAYER,
    });
  });

  describe('test for setting current player', () => {
    const createState = initialState => actions =>
      actions.reduce(rootReducer, initialState);
    const initialState = createState({
      game: {
        player: {
          gameType: undefined,
          currentPlayer: undefined,
          players: [],
        },
      },
    });

    test('it sets the current player', async () => {
      const store = mockStore(initialState);
      await store.dispatch(setGameType(Types.SINGLE_PLAYER));
      expect(store.getState().game.player.gameType).toEqual(
        Types.SINGLE_PLAYER
      );
      await store.dispatch(setPlayers());
      expect(store.getState().game.player.players).toEqual([]);
      await store.dispatch(setCurrentPlayer(Types.PLAYER_BLUE));
      expect(store.getState().game.player.currentPlayer).toEqual(undefined);
      await store.dispatch(setPlayers(Types.PLAYER_RED));
      expect(store.getState().game.player.players).toEqual([
        Types.PLAYER_AI,
        Types.PLAYER_RED,
      ]);
      await store.dispatch(setCurrentPlayer(Types.PLAYER_BLUE));
      expect(store.getState().game.player.currentPlayer).toEqual(
        Types.PLAYER_AI
      );
    });
  });
});
