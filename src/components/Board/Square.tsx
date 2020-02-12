import React from 'react';
import Piece from '../Piece/Piece';
import { CellWrapper } from './styles/Cell';

import { SquareData } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';

interface CellProps {
  cellIsValidMove: boolean;
  currentPlayer: 'Blue' | 'Red';
  highlightClickedPiece: boolean;
  onCellClick: (clickedCellID: number) => void;
  pauseGame: boolean;
  renderedCell: SquareData;
}

const Square: React.FC<CellProps> = ({
  cellIsValidMove,
  currentPlayer,
  highlightClickedPiece,
  onCellClick,
  pauseGame,
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
      isActive={!pauseGame && cellIsValidMove}
      onClick={(): void => onCellClick(renderedID)}
    >
      {renderedPiece && (
        <Piece
          color={renderedPiece.color}
          isActive={!pauseGame && currentPlayer === renderedPiece.color}
          type={renderedPiece.type}
        />
      )}
    </CellWrapper>
  );
};

export default Square;
