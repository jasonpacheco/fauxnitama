import * as types from '../types';
import { gameReducer } from '../reducers';

describe('tests for gameReducer', () => {
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

  describe('tests for SET_GAME_TYPE', () => {
    test('it sets a game type of SINGLE_PLAYER', () => {
      expect(
        gameReducer(initialState, {
          type: types.SET_GAME_TYPE,
          gameType: types.SINGLE_PLAYER,
        })
      ).toEqual({ ...initialState, gameType: types.SINGLE_PLAYER });
    });

    test('it sets a game type of LOCAL_MULTIPLAYER', () => {
      expect(
        gameReducer(initialState, {
          type: types.SET_GAME_TYPE,
          gameType: types.LOCAL_MULTIPLAYER,
        })
      ).toEqual({ ...initialState, gameType: types.LOCAL_MULTIPLAYER });
    });

    test('it sets a game type of ONLINE_MULTIPLAYER', () => {
      expect(
        gameReducer(initialState, {
          type: types.SET_GAME_TYPE,
          gameType: types.ONLINE_MULTIPLAYER,
        })
      ).toEqual({ ...initialState, gameType: types.ONLINE_MULTIPLAYER });
    });
  });

  describe('tests for halfmoves', () => {
    test('it increments by 1', () => {
      expect(
        gameReducer(initialState, { type: types.INCREMENT_HALFMOVE })
      ).toEqual({
        ...initialState,
        halfmoves: 1,
      });
    });

    test('it increments to 3 and then resets to 0', () => {
      const state1 = gameReducer(initialState, {
        type: types.INCREMENT_HALFMOVE,
      });
      const state2 = gameReducer(state1, { type: types.INCREMENT_HALFMOVE });
      const state3 = gameReducer(state2, { type: types.INCREMENT_HALFMOVE });

      expect(state3).toEqual({
        ...state3,
        halfmoves: 3,
      });

      expect(gameReducer(state3, { type: types.RESET_HALFMOVE })).toEqual({
        ...state3,
        halfmoves: 0,
      });
    });
  });

  describe('tests for pause game', () => {
    test('it pauses the game', () => {
      expect(
        gameReducer(initialState, { type: types.SET_PAUSE_GAME }).pauseGame
      ).toBeTruthy();
    });

    test('it unpauses the game', () => {
      const state1 = gameReducer(initialState, { type: types.SET_PAUSE_GAME });
      expect(
        gameReducer(state1, { type: types.SET_PAUSE_GAME }).pauseGame
      ).toBeFalsy();
    });
  });

  describe('tests for ADD_TO_HISTORY', () => {
    test('it adds to the history', () => {
      expect(
        gameReducer(initialState, {
          type: types.ADD_TO_HISTORY,
          move: ['test1'],
        })
      ).toEqual({ ...initialState, history: [['test1']] });
    });

    test('it concatenates', () => {
      const state1 = gameReducer(initialState, {
        type: types.ADD_TO_HISTORY,
        move: ['test1'],
      });

      expect(
        gameReducer(state1, {
          type: types.ADD_TO_HISTORY,
          move: ['test2'],
        })
      ).toEqual({ ...initialState, history: [['test1'], ['test2']] });
    });
  });

  describe('tests for IS_GAME_COMPLETE', () => {
    test('it sets', () => {
      expect(
        gameReducer(initialState, { type: types.SET_IS_GAME_COMPLETE })
          .isGameComplete
      ).toBeTruthy();
    });
  });

  describe('tests for SET_WINNER_BY_END_METHOD', () => {
    test('it sets a winner with a win method', () => {
      expect(
        gameReducer(initialState, {
          type: types.SET_WINNER_BY_END_METHOD,
          winner: types.PLAYER_BLUE,
          endMethod: types.CAPTURE_MASTER,
        })
      ).toEqual({
        ...initialState,
        winner: types.PLAYER_BLUE,
        endMethod: types.CAPTURE_MASTER,
      });
    });
  });
});
