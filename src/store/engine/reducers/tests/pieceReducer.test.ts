import { pieceReducer } from '../pieceReducers';
import * as Types from '../../types/pieceTypes';
import * as GameTypes from '../../types/gameTypes';

describe('tests for pieceReducer', () => {
  const initialState: Types.PieceState = {
    piecePositions: {
      PLAYER_AI: [
        [0, Types.STUDENT],
        [1, Types.STUDENT],
        [2, Types.MASTER],
        [3, Types.STUDENT],
        [4, Types.STUDENT],
      ],
      PLAYER_BLUE: [
        [20, Types.STUDENT],
        [21, Types.STUDENT],
        [22, Types.MASTER],
        [23, Types.STUDENT],
        [24, Types.STUDENT],
      ],
    },
    selectedPiece: undefined,
    halfmoves: 0,
    validMoves: [],
  };

  describe('tests for updates/removes', () => {
    test('it updates positions', () => {
      const stateCopy = { ...initialState };
      const expected = {
        PLAYER_AI: [
          [1, Types.STUDENT],
          [2, Types.MASTER],
          [3, Types.STUDENT],
          [4, Types.STUDENT],
          [5, Types.STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: Types.UPDATE_POSITION,
          playerToUpdate: GameTypes.PLAYER_AI,
          pieceToUpdateID: 0,
          newLocationID: 5,
        })
      ).toEqual({
        ...stateCopy,
        piecePositions: {
          ...stateCopy.piecePositions,
          ...expected,
        },
      });
    });

    test('it updates positions', () => {
      const stateCopy = { ...initialState };
      const expected = {
        PLAYER_BLUE: [
          [18, Types.MASTER],
          [20, Types.STUDENT],
          [21, Types.STUDENT],
          [23, Types.STUDENT],
          [24, Types.STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: Types.UPDATE_POSITION,
          playerToUpdate: GameTypes.PLAYER_BLUE,
          pieceToUpdateID: 22,
          newLocationID: 18,
        })
      ).toEqual({
        ...stateCopy,
        piecePositions: {
          ...stateCopy.piecePositions,
          ...expected,
        },
      });
    });

    test('it removes positions', () => {
      const stateCopy = { ...initialState };
      const expected = {
        PLAYER_AI: [
          [0, Types.STUDENT],
          [1, Types.STUDENT],
          [3, Types.STUDENT],
          [4, Types.STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: Types.REMOVE_PIECE,
          playerToUpdate: GameTypes.PLAYER_AI,
          pieceToRemoveID: 2,
        })
      ).toEqual({
        ...stateCopy,
        piecePositions: {
          ...stateCopy.piecePositions,
          ...expected,
        },
      });
    });

    test('it removes positions', () => {
      const stateCopy = { ...initialState };
      const expected = {
        PLAYER_BLUE: [
          [21, Types.STUDENT],
          [22, Types.MASTER],
          [23, Types.STUDENT],
          [24, Types.STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: Types.REMOVE_PIECE,
          playerToUpdate: GameTypes.PLAYER_BLUE,
          pieceToRemoveID: 20,
        })
      ).toEqual({
        ...stateCopy,
        piecePositions: {
          ...stateCopy.piecePositions,
          ...expected,
        },
      });
    });
  });

  describe('tests for halfmoves', () => {
    test('it increments by 1', () => {
      expect(
        pieceReducer(initialState, { type: Types.INCREMENT_HALFMOVE })
      ).toEqual({
        ...initialState,
        halfmoves: 1,
      });
    });

    test('it increments to 3 and then resets to 0', () => {
      const state1 = pieceReducer(initialState, {
        type: Types.INCREMENT_HALFMOVE,
      });
      const state2 = pieceReducer(state1, {
        type: Types.INCREMENT_HALFMOVE,
      });
      const state3 = pieceReducer(state2, {
        type: Types.INCREMENT_HALFMOVE,
      });

      expect(state3).toEqual({
        ...state3,
        halfmoves: 3,
      });

      expect(pieceReducer(state3, { type: Types.RESET_HALFMOVE })).toEqual({
        ...state3,
        halfmoves: 0,
      });
    });
  });

  describe('test for initialization', () => {
    test('it initializes', () => {
      const initialState: Types.PieceState = {
        piecePositions: {},
        selectedPiece: undefined,
        halfmoves: 0,
        validMoves: [],
      };

      const expected = {
        PLAYER_AI: [
          [0, Types.STUDENT],
          [1, Types.STUDENT],
          [2, Types.MASTER],
          [3, Types.STUDENT],
          [4, Types.STUDENT],
        ],
        PLAYER_BLUE: [
          [20, Types.STUDENT],
          [21, Types.STUDENT],
          [22, Types.MASTER],
          [23, Types.STUDENT],
          [24, Types.STUDENT],
        ],
      };

      expect(
        pieceReducer(initialState, {
          type: Types.INITIALIZE_PIECE_POSITIONS,
          players: [GameTypes.PLAYER_AI, GameTypes.PLAYER_BLUE],
        })
      ).toEqual({
        ...initialState,
        piecePositions: { ...expected },
      });
    });
  });
});
