import { CellData, State, Actions } from '../interfaces/context.interface';

import {
  SET_SELECTED_CELL,
  SET_CURRENT_CARD,
  SET_NEXT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
  MOVE_PIECE,
  SET_HAS_GAME_FINISHED,
} from '../types';
import { idToCoordinate } from '../utils';
import isEqual from 'lodash.isequal';

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
        selectedCard: action.currentCard,
      };
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        selectedCard: undefined,
        currentPlayer: action.player,
      };
    case SET_NEXT_CARD:
      const playerHand = state[action.targetProperty];
      const keyToReplace = Object.keys(playerHand).find(key =>
        isEqual(playerHand[key], action.nextCard)
      );

      if (keyToReplace) {
        playerHand[keyToReplace] = action.replacementCard;
      }

      return {
        ...state,
        ...playerHand,
        nextCard: action.nextCard,
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
              cell.isEmpty = false;
              cell.isBlue = fromCell.piece.color === 'Blue';
              cell.isRed = fromCell.piece.color === 'Red';
            }
            return cell;
          }),
        },
      };
    case SET_HAS_GAME_FINISHED:
      return {
        ...state,
        hasGameFinished: true,
      };
    default:
      return state;
  }
};
