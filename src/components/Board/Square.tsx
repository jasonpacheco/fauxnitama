import React from 'react';
import Piece from '../Piece/Piece';
import { SquareWrapper } from './styles/Square';

import { SquareData } from '../../interfaces/context.interface';

import {
  BLUE_TEMPLE_ID as blueTempleID,
  RED_TEMPLE_ID as redTempleID,
} from '../../utils/constants';
import useGameContext from '../../context/useGameContext';

interface CellProps {
  onSquareClick: (clickedCellID: number) => void;
  renderedSquare: SquareData;
}

const Square: React.FC<CellProps> = ({ onSquareClick, renderedSquare }) => {
  const {
    clickedPiece,
    currentPlayer,
    pauseGame,
    validMoves,
  } = useGameContext();

  const { id: renderedID, piece: renderedPiece } = renderedSquare;
  const squareIsValidMove =
    currentPlayer === clickedPiece?.color &&
    validMoves.includes(renderedSquare.id);
  return (
    <SquareWrapper
      highlightClickedPiece={
        !!renderedSquare.piece &&
        renderedSquare.id === clickedPiece?.currentPositionID
      }
      highlightValidSquare={squareIsValidMove}
      hasTempleBackground={
        renderedPiece === undefined &&
        ((renderedID === blueTempleID && 'Blue') ||
          (renderedID === redTempleID && 'Red'))
      }
      isActive={!pauseGame && squareIsValidMove}
      onClick={(): void => onSquareClick(renderedID)}
    >
      {renderedPiece && (
        <Piece
          isActive={!pauseGame && currentPlayer === renderedPiece.color}
          piece={renderedPiece}
        />
      )}
    </SquareWrapper>
  );
};

export default Square;
