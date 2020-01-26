import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

import { getIds, BOARD_GAME } from '../../utils';
const { COLS } = BOARD_GAME;

const BoardWrapper = styled.div`
  margin: 0 auto;
  width: 30rem;
`;

const Grid = styled.div`
  border: 1px solid #000;
  display: grid;
  height: 30rem;
  grid-template-columns: repeat(${COLS}, 1fr);
  grid-template-rows: repeat(${COLS}, 6rem);
`;

const Board: React.FC = () => {
  return (
    <BoardWrapper>
      <Grid>
        {getIds().map(({ id, x, y }) => (
          <Cell key={id} id={id} x={x} y={y} />
        ))}
      </Grid>
    </BoardWrapper>
  );
};

export default Board;
