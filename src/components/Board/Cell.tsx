import React from 'react';
import isEqual from 'lodash.isequal';
import { Box } from './_BoardStyles';
import Piece from '../Piece/Piece';
import { getTempleID, idToCoordinate } from '../../utils';
import { CellData, Piece as IPiece } from '../../interfaces/context.interface';
import useGameContext from '../../context/useGameContext';

const {
  blue: { id: blueTempleID },
  red: { id: redTempleID },
} = getTempleID();

interface CellProps {
  data: CellData;
}

const Cell: React.FC<CellProps> = ({ data }) => {
  const { id, piece, isValidMove } = data;
  const {
    currentPlayer,
    selectedCell,
    setSelectedCell,
    selectedCard,
    movePiece,
  } = useGameContext();

  const { x, y } = idToCoordinate(id);

  const handleCellClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number,
    id: number,
    piece: IPiece | null
  ): void => {
    if (piece && piece.color === currentPlayer && selectedCard) {
      setSelectedCell(data);
    }

    if (selectedCell && isValidMove) {
      movePiece(selectedCell, id);
    }
  };

  return (
    <Box
      key={id}
      selectedCell={
        selectedCell &&
        selectedCell.piece &&
        selectedCell.piece.color &&
        isEqual(selectedCell.piece.currentPosition, { x, y }) &&
        ((selectedCell.piece.color === 'Blue' && 'Blue') ||
          (selectedCell.piece.color === 'Red' && 'Red'))
      }
      validCellHighlight={isValidMove}
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
