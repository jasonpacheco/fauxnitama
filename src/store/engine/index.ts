import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { cardReducer } from './card/reducers';
import thunk from 'redux-thunk';
import { CardActions } from './card/types';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
  card: cardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = (): Store<AppState, CardActions> & {
  dispatch: unknown;
} => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

export default configureStore;
