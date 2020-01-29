import { CellData, State, Actions } from '../interfaces/context.interface';
import cloneDeep from 'lodash.clonedeep';
import {
  SET_SELECTED_CELL,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
  MOVE_PIECE,
} from '../types';
import { idToCoordinate } from '../utils';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return {
        ...state,
        selectedCell: action.cell,
      };
    case SET_CURRENT_CARD:
      return {
        ...state,
        selectedCard: action.card,
      };
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.player,
      };
    case SET_VALID_MOVES:
      return {
        ...state,
        board: {
          cells: state.board.cells.map(cell => {
            cell.isValidMove = action.moves.includes(cell.id);
            return cell;
          }),
        },
      };
    case MOVE_PIECE:
      return {
        ...state,
        board: {
          cells: state.board.cells.map((cell: CellData) => {
            const fromCell = action.fromCell;
            cell.isValidMove = false;
            if (cell.id === fromCell.id) {
              cell.piece = null;
              cell.isBlue = false;
              cell.isRed = false;
              cell.isEmpty = true;
            }

            if (fromCell.piece && cell.id === action.toID) {
              cell.piece = fromCell.piece;
              cell.piece.currentPosition = idToCoordinate(cell.id);
              console.log(idToCoordinate(cell.id));
              cell.isEmpty = false;
              cell.isBlue = !!fromCell.piece && fromCell.piece.color === 'Blue';
              cell.isRed = !!fromCell.piece && fromCell.piece.color === 'Red';
            }
            return cell;
          }),
        },
      };

    default:
      return state;
  }
};
