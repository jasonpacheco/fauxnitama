import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import GameState from '../context/gameState';
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

const AppDecorator: React.FC = ({ children }): JSX.Element => (
  <>
    <GlobalStyles />
    <GameState>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </GameState>
  </>
);

export default AppDecorator;
