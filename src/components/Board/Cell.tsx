import React from 'react';
import isEqual from 'lodash.isequal';
import { Box } from './_BoardStyles';
import Piece from '../Piece/Piece';
import { BOARD_GAME, idToCoordinate } from '../../utils';
import {
  CellData,
  Piece as IPiece,
  PlayerColor,
} from '../../interfaces/context.interface';

interface CellProps {
  activeCell: CellData | undefined;
  activePlayer: PlayerColor;
  onCellClick: (
    cellData: CellData,
    id: number,
    isValidMove: boolean,
    piece: IPiece | null
  ) => void;
  renderCell: CellData;
}

const Cell: React.FC<CellProps> = ({
  activeCell,
  activePlayer,
  onCellClick,
  renderCell,
}) => {
  const { id, piece, isValidMove } = renderCell;
  const {
    BLUE_TEMPLE_ID: blueTempleID,
    RED_TEMPLE_ID: redTempleID,
  } = BOARD_GAME;

  console.log('Cell rendered');

  return (
    <Box
      key={id}
      highlightSelectedPiece={
        !!renderCell.piece && activeCell?.piece === renderCell.piece
      }
      highlightValidCell={isValidMove && activePlayer}
      hasBackground={
        !piece &&
        ((id === blueTempleID && 'blue') || (id === redTempleID && 'red'))
      }
      onClick={(): void => onCellClick(renderCell, id, isValidMove, piece)}
    >
      {piece && <Piece color={piece.color} type={piece.type} />}
    </Box>
  );
};

export default Cell;
