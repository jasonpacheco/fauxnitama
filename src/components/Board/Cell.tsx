import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import { CellData } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';
import isEqual from 'lodash.isequal';

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
  // console.log('Cell ' + renderedCell.id + ' rendered');
  console.log('Cell rendered');
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
/**
 * Make less spaghetti
 */
// export default React.memo(Cell, (prevProps, nextProps) => {
//   if (!isEqual(prevProps.renderedCell, nextProps.renderedCell)) {
//     return false;
//   }

//   if (
//     isEqual(prevProps.renderedCell.piece, nextProps.renderedCell.piece) &&
//     isEqual(prevProps.onCellClick, nextProps.onCellClick)
//   ) {
//     return true;
//   }

//   /** Re-render to reset valid cell highlighting */
//   if (
//     prevProps.cellIsValidMove === true &&
//     nextProps.cellIsValidMove === false
//   ) {
//     return false;
//   }

//   if (
//     isEqual(prevProps.renderedCell, nextProps.renderedCell) &&
//     prevProps.renderedCell.piece === undefined &&
//     nextProps.cellIsValidMove === false
//   ) {
//     return true;
//   }

//   if (
//     prevProps.cellIsValidMove === nextProps.cellIsValidMove &&
//     prevProps.cellIsValidMove === false &&
//     prevProps.renderedCell.piece === undefined
//   ) {
//     return true;
//   }

//   if (
//     isEqual(prevProps.renderedCell.piece, nextProps.renderedCell.piece) &&
//     prevProps.renderedCell.piece === undefined &&
//     (prevProps.renderedCell.id === 2 || prevProps.renderedCell.id === 22) &&
//     nextProps.cellIsValidMove === false
//   ) {
//     return true;
//   }

//   return false;
// });
