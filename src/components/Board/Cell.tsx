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
    hasGameFinished,
  } = useGameContext();

  const { x, y } = idToCoordinate(id);

  const handleCellClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number,
    id: number,
    piece: IPiece | null
  ): void => {
    if (!hasGameFinished) {
      if (piece?.color === currentPlayer && selectedCard) {
        if (id !== selectedCell?.id) {
          setSelectedCell(data);
        }
      }

      if (selectedCell && isValidMove) {
        movePiece(selectedCell, id);
      }
    }
  };

  return (
    <Box
      key={id}
      highlightSelectedPiece={isEqual(selectedCell?.piece?.currentPosition, {
        x,
        y,
      })}
      highlightValidCell={isValidMove && currentPlayer}
      hasBackground={
        !piece &&
        ((id === blueTempleID && 'blue') || (id === redTempleID && 'red'))
      }
      onClick={(e): void => handleCellClick(e, x, y, id, piece)}
    >
      {piece && <Piece color={piece.color} type={piece.type} />}
    </Box>
  );
};

export default Cell;
