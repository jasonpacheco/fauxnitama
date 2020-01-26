import React from 'react';
import { Box } from './_BoardStyles';
import Piece from '../Piece/Piece';
import { getTempleID } from '../../utils';
import { Piece as IPiece } from '../../interfaces/context.interface';
import useGameContext from '../../context/useGameContext';

const {
  blue: { id: blueTempleID },
  red: { id: redTempleID },
} = getTempleID();

interface CellProps {
  id: number;
  x: number;
  y: number;
  piece: IPiece | null;
}

const Cell: React.FC<CellProps> = ({ id, x, y, piece }) => {
  const { setClickedCoordinates } = useGameContext();
  return (
    <Box
      key={id}
      hasBackground={
        (id === blueTempleID && 'blue') || (id === redTempleID && 'red')
      }
      onClick={(): void => setClickedCoordinates({ x: x, y: y, id: id })}
    >
      {piece ? <Piece color={piece.color} type={piece.type} /> : 'Box'}
    </Box>
  );
};

export default Cell;
