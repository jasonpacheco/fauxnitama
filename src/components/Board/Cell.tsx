import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import { CellData, Piece as IPiece } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';
import isEqual from 'lodash.isequal';

interface CellProps {
  cellIsValidMove: boolean;
  clickedPiece: IPiece | undefined;
  onCellClick: (
    clickedCellID: number,
    clickedCellIsValidMove: boolean,
    piece: IPiece | undefined
  ) => void;
  renderedCell: CellData;
}

const Cell: React.FC<CellProps> = ({
  cellIsValidMove,
  clickedPiece,
  onCellClick,
  renderedCell,
}) => {
  const { id: renderedCellID, piece: renderedCellPiece } = renderedCell;
  return (
    <CellWrapper
      key={renderedCellID}
      highlightSelectedPiece={
        renderedCellPiece !== undefined &&
        isEqual(clickedPiece, renderedCellPiece)
      }
      highlightValidCell={cellIsValidMove}
      hasTempleBackground={
        renderedCellPiece === undefined &&
        ((renderedCellID === blueTempleID && 'Blue') ||
          (renderedCellID === redTempleID && 'Red'))
      }
      onClick={(): void =>
        onCellClick(renderedCellID, cellIsValidMove, renderedCellPiece)
      }
    >
      {renderedCellPiece && (
        <Piece color={renderedCellPiece.color} type={renderedCellPiece.type} />
      )}
    </CellWrapper>
  );
};

export default Cell;
