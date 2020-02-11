import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';
import GameState from '../context/gameState';

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
    <GameState>{children}</GameState>
  </>
);

export default AppDecorator;
