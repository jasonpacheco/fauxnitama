import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import useGameContext from '../../context/useGameContext';

const Board: React.FC = () => {
  const { board } = useGameContext();
  // const board = getBoard();
  // useEffect(() => {
  //   board.current = getBoard();
  // }, [selectedCard, getBoard]);
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
