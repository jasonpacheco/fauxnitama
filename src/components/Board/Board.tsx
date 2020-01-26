import React from 'react';
import Cell from './Cell';
import { getIDs } from '../../utils';
import { BoardWrapper, Grid } from './_BoardStyles';
import useGameContext from '../../context/useGameContext';

const Board: React.FC = () => {
  const { getBoard } = useGameContext();
  const board = getBoard();
  return (
    <BoardWrapper>
      <Grid>
        {getIDs().map(({ id, x, y }) => (
          <Cell key={id} id={id} x={x} y={y} piece={board[x][y]} />
        ))}
      </Grid>
    </BoardWrapper>
  );
};

export default Board;
