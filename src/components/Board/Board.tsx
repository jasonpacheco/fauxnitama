import React, { useEffect } from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import useGameContext from '../../context/useGameContext';

const Board: React.FC = () => {
  const { board, isCleared } = useGameContext();
  // const board = getBoard();
  // useEffect(() => {
  //   console.log('useEffect ran');
  // }, [!isCleared]);
  return (
    <GridWrapper>
      <Grid>
        {board.cells.map(cell => (
          <Cell key={cell.id} data={cell} />
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default Board;
