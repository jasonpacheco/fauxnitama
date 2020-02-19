import * as Types from '../../types';
import { propertiesReducer } from '../../reducers';

describe('tests for gameReducer', () => {
  const initialState: Types.PropertiesState = {
    endMethod: undefined,
    halfmoves: 0,
    history: [],
    isGameComplete: false,
    pauseGame: false,
    winner: undefined,
  };

  describe('tests for halfmoves', () => {
    test('it increments by 1', () => {
      expect(
        propertiesReducer(initialState, { type: Types.INCREMENT_HALFMOVE })
      ).toEqual({
        ...initialState,
        halfmoves: 1,
      });
    });

    test('it increments to 3 and then resets to 0', () => {
      const state1 = propertiesReducer(initialState, {
        type: Types.INCREMENT_HALFMOVE,
      });
      const state2 = propertiesReducer(state1, {
        type: Types.INCREMENT_HALFMOVE,
      });
      const state3 = propertiesReducer(state2, {
        type: Types.INCREMENT_HALFMOVE,
      });

      expect(state3).toEqual({
        ...state3,
        halfmoves: 3,
      });

      expect(propertiesReducer(state3, { type: Types.RESET_HALFMOVE })).toEqual(
        {
          ...state3,
          halfmoves: 0,
        }
      );
    });
  });

  describe('tests for pause game', () => {
    test('it pauses the game', () => {
      expect(
        propertiesReducer(initialState, { type: Types.SET_PAUSE_GAME })
          .pauseGame
      ).toBeTruthy();
    });

    test('it unpauses the game', () => {
      const state1 = propertiesReducer(initialState, {
        type: Types.SET_PAUSE_GAME,
      });
      expect(
        propertiesReducer(state1, { type: Types.SET_PAUSE_GAME }).pauseGame
      ).toBeFalsy();
    });
  });

  describe('tests for ADD_TO_HISTORY', () => {
    test('it adds to the history', () => {
      expect(
        propertiesReducer(initialState, {
          type: Types.ADD_TO_HISTORY,
          move: ['test1'],
        })
      ).toEqual({ ...initialState, history: [['test1']] });
    });

    test('it concatenates', () => {
      const state1 = propertiesReducer(initialState, {
        type: Types.ADD_TO_HISTORY,
        move: ['test1'],
      });

      expect(
        propertiesReducer(state1, {
          type: Types.ADD_TO_HISTORY,
          move: ['test2'],
        })
      ).toEqual({ ...initialState, history: [['test1'], ['test2']] });
    });
  });

  describe('tests for IS_GAME_COMPLETE', () => {
    test('it sets', () => {
      expect(
        propertiesReducer(initialState, { type: Types.SET_IS_GAME_COMPLETE })
          .isGameComplete
      ).toBeTruthy();
    });
  });

  describe('tests for SET_WINNER_BY_END_METHOD', () => {
    test('it sets a winner with a win method', () => {
      expect(
        propertiesReducer(initialState, {
          type: Types.SET_WINNER_BY_END_METHOD,
          winner: Types.PLAYER_BLUE,
          endMethod: Types.CAPTURE_MASTER,
        })
      ).toEqual({
        ...initialState,
        winner: Types.PLAYER_BLUE,
        endMethod: Types.CAPTURE_MASTER,
      });
    });
  });
});
