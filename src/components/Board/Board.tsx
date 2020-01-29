import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import useGameContext from '../../context/useGameContext';

const Board: React.FC = () => {
  const { getBoard } = useGameContext();
  const board = getBoard();
  return (
    <GridWrapper>
      <Grid>
        {board.map(cell => (
          <Cell key={cell.id} id={cell.id} piece={cell.piece} />
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default Board;
