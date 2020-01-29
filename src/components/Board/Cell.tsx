import React from 'react';
import isEqual from 'lodash.isequal';
import { Box } from './_BoardStyles';
import Piece from '../Piece/Piece';
import { getTempleID, idToCoordinate } from '../../utils';
import { Piece as IPiece } from '../../interfaces/context.interface';
import useGameContext from '../../context/useGameContext';

const {
  blue: { id: blueTempleID },
  red: { id: redTempleID },
} = getTempleID();

interface CellProps {
  id: number;
  piece: IPiece | null;
  isValidCell: boolean;
}

const Cell: React.FC<CellProps> = ({ id, piece, isValidCell }) => {
  const {
    currentPlayer,
    clickedCoordinates,
    setClickedCoordinates,
    selectedCard,
  } = useGameContext();

  const { x, y } = idToCoordinate(id);

  const handleCellClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number,
    id: number,
    piece: IPiece | null
  ): void => {
    if (piece?.color === currentPlayer && selectedCard) {
      setClickedCoordinates({ x: x, y: y, id: id });
    }
  };

  return (
    <Box
      key={id}
      selectedCell={
        clickedCoordinates && isEqual(clickedCoordinates, { x, y, id })
      }
      validCellHighlight={isValidCell}
      hasBackground={
        !piece &&
        ((id === blueTempleID && 'blue') || (id === redTempleID && 'red'))
      }
      onClick={(e): void => handleCellClick(e, x, y, id, piece)}
    >
      {piece ? <Piece color={piece.color} type={piece.type} /> : id}
    </Box>
  );
};

export default Cell;
