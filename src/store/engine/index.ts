import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cardReducer } from './card/reducers';
import { gameReducer } from './game/reducers';
import { CardActions } from './card/types';
import { GameActions } from './game/types';

export const rootReducer = combineReducers({
  card: cardReducer,
  game: gameReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = CardActions | GameActions;
export type ThunkResult<R> = ThunkAction<R, AppState, null, AppActions>;

const configureStore = (): Store<AppState, AppActions> & {
  dispatch: unknown;
} => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

export default configureStore;
