import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cardReducer } from './reducers/cardReducers';
import { gameReducer } from './reducers/gameReducers';
import { pieceReducer } from './reducers/pieceReducers';
import { CardActions } from './types/cardTypes';
import { GameActions } from './types/gameTypes';
import { PieceActions } from './types/pieceTypes';
import { EventActions } from './types/eventTypes';

export const rootReducer = combineReducers({
  cardReducer,
  gameReducer,
  pieceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions =
  | CardActions
  | GameActions
  | PieceActions
  | EventActions;
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
