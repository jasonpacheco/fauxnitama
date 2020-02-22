import * as Types from '../types/pieceTypes';

const initialState: Types.PieceState = {
  piecePositions: {},
  selectedPiece: undefined,
  halfmoves: 0,
  validMoves: [],
};

export const isMoveCapture = (
  otherPlayerArray: [number, Types.PieceType][],
  newLocationID: number
): boolean =>
  !!otherPlayerArray.find(pieceTuple => pieceTuple[0] === newLocationID);

export const pieceReducer = (
  state = initialState,
  action: Types.PieceActions
): Types.PieceState => {
  switch (action.type) {
    case Types.INITIALIZE_PIECE_POSITIONS:
      const [player1, player2] = action.players;
      return {
        ...state,
        piecePositions: {
          [player1]: [
            [0, Types.STUDENT],
            [1, Types.STUDENT],
            [2, Types.MASTER],
            [3, Types.STUDENT],
            [4, Types.STUDENT],
          ],
          [player2]: [
            [20, Types.STUDENT],
            [21, Types.STUDENT],
            [22, Types.MASTER],
            [23, Types.STUDENT],
            [24, Types.STUDENT],
          ],
        },
      };
    case Types.INCREMENT_HALFMOVE:
      return {
        ...state,
        halfmoves: state.halfmoves + 1,
      };
    case Types.RESET_HALFMOVE:
      return {
        ...state,
        halfmoves: 0,
      };
    case Types.SET_SELECTED_PIECE:
      return {
        ...state,
        selectedPiece: [action.id, action.pieceType],
      };
    case Types.UPDATE_POSITION:
      return {
        ...state,
        piecePositions: {
          ...state.piecePositions,
          [action.playerToUpdate]: state.piecePositions[action.playerToUpdate]
            ?.map<Types.PieceTuple>(([id, pieceType]) => {
              if (id === action.pieceToUpdateID) {
                return [action.newLocationID, pieceType];
              }
              return [id, pieceType];
            })
            .sort(
              (tupleA: Types.PieceTuple, tupleB: Types.PieceTuple) =>
                tupleA[0] - tupleB[0]
            ),
        },
      };
    case Types.REMOVE_PIECE:
      return {
        ...state,
        piecePositions: {
          ...state.piecePositions,
          [action.playerToUpdate]: state.piecePositions[
            action.playerToUpdate
          ]?.filter(([id]) => id !== action.pieceToRemoveID),
        },
      };
    case Types.ADD_VALID_MOVES:
      return {
        ...state,
        validMoves: action.validMoves,
      };
    default:
      return state;
  }
};
