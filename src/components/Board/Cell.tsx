import React from 'react';
import { Box } from './_BoardStyles';
import Piece from '../Piece/Piece';
import { BOARD_GAME } from '../../utils';
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
  const {
    BLUE_TEMPLE_ID: blueTempleID,
    RED_TEMPLE_ID: redTempleID,
  } = BOARD_GAME;

  const {
    id: renderCellID,
    piece: renderCellPiece,
    isValidMove: renderCellValidMove,
  } = renderCell;

  console.log('Cell rendered');

  return (
    <Box
      key={renderCellID}
      highlightSelectedPiece={
        !!renderCell.piece && activeCell?.piece === renderCell.piece
      }
      highlightValidCell={renderCellValidMove && activePlayer}
      hasTempleBackground={
        !renderCellPiece &&
        ((renderCellID === blueTempleID && 'Blue') ||
          (renderCellID === redTempleID && 'Red'))
      }
      onClick={(): void =>
        onCellClick(
          renderCell,
          renderCellID,
          renderCellValidMove,
          renderCellPiece
        )
      }
    >
      {renderCellPiece && (
        <Piece color={renderCellPiece.color} type={renderCellPiece.type} />
      )}
    </Box>
  );
};

export default Cell;
