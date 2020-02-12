import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components/macro';
import GameState from './context/gameState';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </GameState>
  </React.Fragment>,
  document.getElementById('root')
);
