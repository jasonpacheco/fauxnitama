import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import { CellData } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';

interface CellProps {
  cellIsValidMove: boolean;
  highlightClickedPiece: boolean;
  onCellClick: (clickedCellID: number) => void;
  renderedCell: CellData;
}

const Cell: React.FC<CellProps> = ({
  cellIsValidMove,
  highlightClickedPiece,
  onCellClick,
  renderedCell,
}) => {
  const { id: renderedID, piece: renderedPiece } = renderedCell;
  return (
    <CellWrapper
      highlightSelectedPiece={highlightClickedPiece}
      highlightValidCell={cellIsValidMove}
      hasTempleBackground={
        renderedPiece === undefined &&
        ((renderedID === blueTempleID && 'Blue') ||
          (renderedID === redTempleID && 'Red'))
      }
      onClick={(): void => onCellClick(renderedID)}
    >
      {renderedPiece && (
        <Piece color={renderedPiece.color} type={renderedPiece.type} />
      )}
    </CellWrapper>
  );
};

export default Cell;
