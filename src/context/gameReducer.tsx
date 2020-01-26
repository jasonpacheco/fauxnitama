import { State, Actions } from '../interfaces/context.interface';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SET_COORDINATES':
      return {
        ...state,
        clickedCoordinates: action.coordinates,
      };
    default:
      return state;
  }
};
