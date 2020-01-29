import { State, Actions } from '../interfaces/context.interface';
import {
  SET_COORDINATES,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
} from '../types';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case SET_COORDINATES:
      return {
        ...state,
        clickedCoordinates: action.coordinates,
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
    default:
      return state;
  }
};
