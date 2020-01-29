import { State, Actions } from '../interfaces/context.interface';
import {
  SET_COORDINATES,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
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
    default:
      return state;
  }
};
