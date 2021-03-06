import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

import { cardReducer } from './reducers/cardReducers';
import { gameReducer } from './reducers/gameReducers';
import { pieceReducer } from './reducers/pieceReducers';
import { ButtonActions } from './types/buttonTypes';
import { CardActions } from './types/cardTypes';
import { EventActions } from './types/eventTypes';

export const rootReducer = combineReducers({
  cardReducer,
  gameReducer,
  pieceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = CardActions | EventActions | ButtonActions;
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
