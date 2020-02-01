import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import { CellData } from '../../interfaces/context.interface';

interface BoardProps {
  cells: CellData[];
}

const Board: React.FC<BoardProps> = ({ cells }) => {
  return (
    <GridWrapper>
      <Grid>
        {cells.map(cell => (
          <Cell key={cell.id} data={cell} />
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default Board;
