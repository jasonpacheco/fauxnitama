import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { cardReducer } from './card/reducers';
import thunk from 'redux-thunk';
import { CardActions } from './card/types';

const rootReducer = combineReducers({
  card: cardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = (): Store<AppState, CardActions> & {
  dispatch: unknown;
} => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;
