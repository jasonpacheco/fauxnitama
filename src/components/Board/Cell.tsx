import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import { CellData, Piece as IPiece } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';

interface CellProps {
  activeCell: CellData | undefined;
  isValidMove: boolean;
  onCellClick: (
    cellData: CellData,
    id: number,
    isValidMove: boolean,
    piece: IPiece | undefined
  ) => void;
  renderCell: CellData;
}

const Cell: React.FC<CellProps> = ({
  activeCell,
  isValidMove,
  onCellClick,
  renderCell,
}) => {
  const { id: renderCellID, piece: renderCellPiece } = renderCell;

  // console.log('Cell rendered');

  return (
    <CellWrapper
      key={renderCellID}
      highlightSelectedPiece={
        !!renderCell.piece && activeCell?.piece === renderCell.piece
      }
      highlightValidCell={isValidMove}
      hasTempleBackground={
        !renderCellPiece &&
        ((renderCellID === blueTempleID && 'Blue') ||
          (renderCellID === redTempleID && 'Red'))
      }
      onClick={(): void =>
        onCellClick(renderCell, renderCellID, isValidMove, renderCellPiece)
      }
    >
      {renderCellPiece && (
        <Piece color={renderCellPiece.color} type={renderCellPiece.type} />
      )}
    </CellWrapper>
  );
};

export default Cell;
