import {
  INITIALIZE_PIECE_POSITIONS,
  PieceState,
  PieceType,
  PieceActions,
  STUDENT,
  MASTER,
  INCREMENT_HALFMOVE,
  RESET_HALFMOVE,
  SET_SELECTED_PIECE,
  UPDATE_POSITION,
  PieceTuple,
  REMOVE_PIECE,
  ADD_VALID_MOVES,
} from '../types/pieceTypes';

const initialState: PieceState = {
  piecePositions: {},
  selectedPiece: [],
  halfmoves: 0,
  validMoves: [],
};

export const isMoveCapture = (
  otherPlayerArray: [number, PieceType][],
  newLocationID: number
): boolean =>
  !!otherPlayerArray.find(pieceTuple => pieceTuple[0] === newLocationID);

export const pieceReducer = (
  state = initialState,
  action: PieceActions
): PieceState => {
  switch (action.type) {
    case INITIALIZE_PIECE_POSITIONS:
      const [player1, player2] = action.players;
      return {
        ...state,
        piecePositions: {
          ...state.piecePositions,
          [player1]: [
            [0, STUDENT],
            [1, STUDENT],
            [2, MASTER],
            [3, STUDENT],
            [4, STUDENT],
          ],
          [player2]: [
            [20, STUDENT],
            [21, STUDENT],
            [22, MASTER],
            [23, STUDENT],
            [24, STUDENT],
          ],
        },
      };
    case INCREMENT_HALFMOVE:
      return {
        ...state,
        halfmoves: state.halfmoves + 1,
      };
    case RESET_HALFMOVE:
      return {
        ...state,
        halfmoves: 0,
      };
    case SET_SELECTED_PIECE:
      return {
        ...state,
        selectedPiece: [action.id, action.pieceType],
      };
    case UPDATE_POSITION:
      return {
        ...state,
        piecePositions: {
          ...state.piecePositions,
          [action.playerToUpdate]: state.piecePositions[action.playerToUpdate]
            .map<PieceTuple>(([id, pieceType]) => {
              if (id === action.pieceToUpdateID) {
                return [action.newLocationID, pieceType];
              }
              return [id, pieceType];
            })
            .sort(
              (tupleA: PieceTuple, tupleB: PieceTuple) => tupleA[0] - tupleB[0]
            ),
        },
      };
    case REMOVE_PIECE:
      return {
        ...state,
        piecePositions: {
          ...state.piecePositions,
          [action.playerToUpdate]: state.piecePositions[
            action.playerToUpdate
          ].filter(([id]) => id !== action.pieceToRemoveID),
        },
      };
    case ADD_VALID_MOVES:
      return {
        ...state,
        validMoves: action.validMoves,
      };
    default:
      return state;
  }
};
