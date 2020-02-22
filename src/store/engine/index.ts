import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cardReducer } from './reducers/cardReducers';
import { gameReducer } from './reducers/gameReducers';
import { pieceReducer } from './reducers/pieceReducers';
import { CardActions } from './types/cardTypes';
import { GameActions } from './types/gameTypes';
import { PieceActions } from './types/pieceTypes';

export const rootReducer = combineReducers({
  card: cardReducer,
  game: gameReducer,
  piece: pieceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = CardActions | GameActions | PieceActions;
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
