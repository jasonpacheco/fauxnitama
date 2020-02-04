import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './_BoardStyles';

import { Piece as IPiece } from '../../interfaces/context.interface';

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
  renderedID: number;
  renderedPiece: IPiece | undefined;
}

const Cell: React.FC<CellProps> = ({
  cellIsValidMove,
  clickedPiece,
  onCellClick,
  renderedID,
  renderedPiece,
}) => {
  // console.log('Cell rendered');
  return (
    <CellWrapper
      key={renderedID}
      highlightSelectedPiece={
        renderedPiece !== undefined && isEqual(clickedPiece, renderedPiece)
      }
      highlightValidCell={cellIsValidMove}
      hasTempleBackground={
        renderedPiece === undefined &&
        ((renderedID === blueTempleID && 'Blue') ||
          (renderedID === redTempleID && 'Red'))
      }
      onClick={(): void =>
        onCellClick(renderedID, cellIsValidMove, renderedPiece)
      }
    >
      {renderedPiece && (
        <Piece color={renderedPiece.color} type={renderedPiece.type} />
      )}
    </CellWrapper>
  );
};

export default Cell;
