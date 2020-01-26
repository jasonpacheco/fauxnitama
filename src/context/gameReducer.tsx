import { State, Actions } from '../interfaces/context.interface';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    default:
      return state;
  }
};
