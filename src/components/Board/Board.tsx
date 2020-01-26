import React from 'react';
import Cell from './Cell';
import { getIDs } from '../../utils';
import { BoardWrapper, Grid } from './_BoardStyles';

const Board: React.FC = () => {
  return (
    <BoardWrapper>
      <Grid>
        {getIDs().map(({ id, x, y }) => (
          <Cell key={id} id={id} x={x} y={y} />
        ))}
      </Grid>
    </BoardWrapper>
  );
};

export default Board;
