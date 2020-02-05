import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import { Piece as IPiece } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';

interface CellProps {
  cellIsValidMove: boolean;
  highlightClickedPiece: boolean;
  onCellClick: (clickedCellID: number) => void;
  renderedID: number;
  renderedPiece: IPiece | undefined;
}

const Cell: React.FC<CellProps> = ({
  cellIsValidMove,
  highlightClickedPiece,
  onCellClick,
  renderedID,
  renderedPiece,
}) => {
  console.log('Cell rendered');
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

// export default React.memo(Cell, (prevProps, nextProps) => {
//   return (
//     prevProps.cellIsValidMove === nextProps.cellIsValidMove &&
//     !prevProps.cellIsValidMove
//   );
// });
