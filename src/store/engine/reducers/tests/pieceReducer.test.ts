import { pieceReducer } from '../pieceReducers';
import { PLAYER_AI, PLAYER_BLUE } from '../../types/gameTypes';
import {
  PieceState,
  STUDENT,
  MASTER,
  UPDATE_POSITION,
  REMOVE_PIECE,
  INCREMENT_HALFMOVE,
  RESET_HALFMOVE,
  INITIALIZE_PIECE_POSITIONS,
} from '../../types/pieceTypes';

describe('tests for pieceReducer', () => {
  const initialState: PieceState = {
    piecePositions: {
      PLAYER_AI: [
        [0, STUDENT],
        [1, STUDENT],
        [2, MASTER],
        [3, STUDENT],
        [4, STUDENT],
      ],
      PLAYER_BLUE: [
        [20, STUDENT],
        [21, STUDENT],
        [22, MASTER],
        [23, STUDENT],
        [24, STUDENT],
      ],
    },
    selectedPiece: [],
    halfmoves: 0,
    validMoves: [],
  };

  describe('tests for updates/removes', () => {
    test('it updates positions', () => {
      const stateCopy = { ...initialState };
      const expected = {
        PLAYER_AI: [
          [1, STUDENT],
          [2, MASTER],
          [3, STUDENT],
          [4, STUDENT],
          [5, STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: UPDATE_POSITION,
          playerToUpdate: PLAYER_AI,
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
          [18, MASTER],
          [20, STUDENT],
          [21, STUDENT],
          [23, STUDENT],
          [24, STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: UPDATE_POSITION,
          playerToUpdate: PLAYER_BLUE,
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
          [0, STUDENT],
          [1, STUDENT],
          [3, STUDENT],
          [4, STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: REMOVE_PIECE,
          playerToUpdate: PLAYER_AI,
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
          [21, STUDENT],
          [22, MASTER],
          [23, STUDENT],
          [24, STUDENT],
        ],
      };
      expect(
        pieceReducer(stateCopy, {
          type: REMOVE_PIECE,
          playerToUpdate: PLAYER_BLUE,
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
      expect(pieceReducer(initialState, { type: INCREMENT_HALFMOVE })).toEqual({
        ...initialState,
        halfmoves: 1,
      });
    });

    test('it increments to 3 and then resets to 0', () => {
      const state1 = pieceReducer(initialState, {
        type: INCREMENT_HALFMOVE,
      });
      const state2 = pieceReducer(state1, {
        type: INCREMENT_HALFMOVE,
      });
      const state3 = pieceReducer(state2, {
        type: INCREMENT_HALFMOVE,
      });

      expect(state3).toEqual({
        ...state3,
        halfmoves: 3,
      });

      expect(pieceReducer(state3, { type: RESET_HALFMOVE })).toEqual({
        ...state3,
        halfmoves: 0,
      });
    });
  });

  describe('test for initialization', () => {
    test('it initializes', () => {
      const initialState: PieceState = {
        piecePositions: {},
        selectedPiece: [],
        halfmoves: 0,
        validMoves: [],
      };

      const expected = {
        PLAYER_AI: [
          [0, STUDENT],
          [1, STUDENT],
          [2, MASTER],
          [3, STUDENT],
          [4, STUDENT],
        ],
        PLAYER_BLUE: [
          [20, STUDENT],
          [21, STUDENT],
          [22, MASTER],
          [23, STUDENT],
          [24, STUDENT],
        ],
      };

      expect(
        pieceReducer(initialState, {
          type: INITIALIZE_PIECE_POSITIONS,
          players: [PLAYER_AI, PLAYER_BLUE],
        })
      ).toEqual({
        ...initialState,
        piecePositions: { ...expected },
      });
    });
  });
});
