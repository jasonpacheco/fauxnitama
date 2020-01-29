import { State, Actions } from '../interfaces/context.interface';
import { SET_COORDINATES, SET_CURRENT_CARD } from '../types';

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
    default:
      return state;
  }
};
