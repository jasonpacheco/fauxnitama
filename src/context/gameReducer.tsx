import { State, Actions } from '../interfaces/context.interface';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
