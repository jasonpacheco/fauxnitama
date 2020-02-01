import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import {
  CellData,
  Piece as IPiece,
  PlayerColor,
} from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';

interface CellProps {
  activeCell: CellData | undefined;
  activePlayer: PlayerColor;
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
  activePlayer,
  onCellClick,
  renderCell,
}) => {
  const {
    id: renderCellID,
    piece: renderCellPiece,
    isValidMove: renderCellValidMove,
  } = renderCell;

  console.log('Cell rendered');

  return (
    <CellWrapper
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
    </CellWrapper>
  );
};

export default Cell;
