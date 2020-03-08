import {
  ON_CLICK_BUTTON_PASS,
  ON_CLICK_BUTTON_YES_RESTART,
  OnClickButtonPass,
  OnClickButtonYesRestart,
} from '../types/buttonTypes';
import { CardActions, ON_CLICK_CARD } from '../types/cardTypes';
import {
  ON_CLICK_PIECE,
  ON_CLICK_SQUARE,
  ON_GAME_INITIALIZATION,
  OnClickPieceAction,
  OnClickSquareAction,
  OnGameInitializationAction,
} from '../types/eventTypes';
import { MASTER, PieceState, PieceTuple, STUDENT } from '../types/pieceTypes';

const initialState: PieceState = {
  halfmoves: 0,
  piecePositions: {},
  selectedPiece: [],
  validMoves: [],
};

export const pieceReducer = (
  state = initialState,
  action:
    | CardActions
    | OnClickPieceAction
    | OnClickSquareAction
    | OnGameInitializationAction
    | OnClickButtonYesRestart
    | OnClickButtonPass
): PieceState => {
  switch (action.type) {
    case ON_CLICK_BUTTON_PASS:
      return {
        ...state,
        halfmoves: action.halfmoves,
        selectedPiece: [],
        validMoves: [],
      };
    case ON_CLICK_BUTTON_YES_RESTART:
      return {
        ...state,
        halfmoves: 0,
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
        selectedPiece: [],
        validMoves: [],
      };
    case ON_CLICK_CARD:
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
        selectedPiece: [],
        validMoves: [],
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

    default:
      return state;
  }
};
