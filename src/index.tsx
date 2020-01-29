import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import GameState from './context/gameState';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyles />
    <GameState>
      <App />
    </GameState>
  </React.Fragment>,
  document.getElementById('root')
);
