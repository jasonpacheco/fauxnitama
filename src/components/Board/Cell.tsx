import React, { useState } from 'react';
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
  const {
    currentPlayer,
    setClickedCoordinates,
    selectedCard,
  } = useGameContext();

  const [highlight, setHighlight] = useState(false);

  const handleCellClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number,
    id: number,
    piece: IPiece | null
  ): void => {
    if (piece?.color === currentPlayer && selectedCard) {
      setClickedCoordinates({ x: x, y: y, id: id });
      setHighlight(true);
      console.log(x, y, id, piece);
    }
  };

  return (
    <Box
      key={id}
      highlighted={highlight}
      hasBackground={
        !piece &&
        ((id === blueTempleID && 'blue') || (id === redTempleID && 'red'))
      }
      onClick={(e): void => handleCellClick(e, x, y, id, piece)}
    >
      {piece ? <Piece color={piece.color} type={piece.type} /> : ''}
    </Box>
  );
};

export default Cell;
