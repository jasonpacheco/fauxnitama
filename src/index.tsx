import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components/macro';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import configureStore from './store/engine';
import { Provider } from 'react-redux';
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;
const store = configureStore();
console.log(store.getState());
ReactDOM.render(
  <Fragment>
    <GlobalStyles />
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </Fragment>,
  document.getElementById('root')
);
