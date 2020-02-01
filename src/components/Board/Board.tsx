import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import { CellData } from '../../interfaces/context.interface';
import isEqual from 'lodash.isequal';

interface BoardProps {
  cells: CellData[];
}

const Board: React.FC<BoardProps> = ({ cells }) => {
  console.log('Board rendered');
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

export default React.memo(Board, (prevProps, nextProps) => {
  return isEqual(prevProps.cells, nextProps.cells);
});
