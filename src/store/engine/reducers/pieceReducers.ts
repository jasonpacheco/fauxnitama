import {
  PieceState,
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
import {
  OnClickPieceAction,
  ON_CLICK_PIECE,
  OnClickSquareAction,
  ON_CLICK_SQUARE,
  OnGameInitializationAction,
  ON_GAME_INITIALIZATION,
  OnClickCardAction,
  ON_CLICK_CARD,
} from '../types/eventTypes';
import {
  OnClickButtonYesRestart,
  ON_CLICK_BUTTON_YES_RESTART,
  ON_CLICK_BUTTON_PASS,
  OnClickButtonPass,
} from '../types/buttonTypes';

const initialState: PieceState = {
  piecePositions: {},
  selectedPiece: [],
  halfmoves: 0,
  validMoves: [],
};

export const pieceReducer = (
  state = initialState,
  action:
    | PieceActions
    | OnClickPieceAction
    | OnClickSquareAction
    | OnClickCardAction
    | OnGameInitializationAction
    | OnClickButtonYesRestart
    | OnClickButtonPass
): PieceState => {
  switch (action.type) {
    case ON_CLICK_BUTTON_PASS:
      return {
        ...state,
        selectedPiece: [],
        validMoves: [],
        halfmoves: state.halfmoves + 1,
      };
    case ON_CLICK_BUTTON_YES_RESTART:
      return {
        ...state,
        selectedPiece: [],
        halfmoves: 0,
        validMoves: [],
        piecePositions: {
          ...state.piecePositions,
          [action.players[0]]: [
            [0, STUDENT],
            [1, STUDENT],
            [2, MASTER],
            [3, STUDENT],
            [4, STUDENT],
          ],
          [action.players[1]]: [
            [20, STUDENT],
            [21, STUDENT],
            [22, MASTER],
            [23, STUDENT],
            [24, STUDENT],
          ],
        },
      };
    case ON_CLICK_CARD:
      return {
        ...state,
        validMoves: action.validMoves,
      };
    case ON_GAME_INITIALIZATION:
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
    case ON_CLICK_PIECE:
      return {
        ...state,
        selectedPiece: action.selectedPiece,
        validMoves: action.validMoves,
      };
    case ON_CLICK_SQUARE:
      return {
        ...state,
        selectedPiece: [],
        validMoves: [],
        halfmoves: action.halfmoves,
        piecePositions: {
          ...state.piecePositions,
          [action.currentPlayer]: state.piecePositions[action.currentPlayer]
            .map<PieceTuple>(([id, pieceType]) => {
              if (id === action.idToUpdate) {
                return [action.targetID, pieceType];
              }
              return [id, pieceType];
            })
            .sort(
              (tupleA: PieceTuple, tupleB: PieceTuple) => tupleA[0] - tupleB[0]
            ),
          [action.opponent]: state.piecePositions[action.opponent].filter(
            ([id]) => id !== action.targetID
          ),
        },
      };
    default:
      return state;
  }
};
