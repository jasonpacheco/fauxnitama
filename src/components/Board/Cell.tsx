import React from 'react';
import { Box } from './_BoardStyles';
import Piece from '../Piece/Piece';
import { getTempleID } from '../../utils';

const {
  blue: { id: blueTempleID },
  red: { id: redTempleID },
} = getTempleID();

interface CellProps {
  id: number;
  x: number;
  y: number;
}

const Cell: React.FC<CellProps> = ({ id, x, y }) => {
  return (
    <Box
      key={id}
      hasBackground={
        (id === blueTempleID && 'blue') || (id === redTempleID && 'red')
      }
      onClick={(): void => console.log(`{x:${x},y:${y},id:${id}}`)}
    >
      {id === 2 ? <Piece id={2} /> : id === 22 ? <Piece id={22} /> : 'Box'}
    </Box>
  );
};

export default Cell;
