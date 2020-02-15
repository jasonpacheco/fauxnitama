import React from 'react';
import Piece from '../Piece/Piece';
import { SquareWrapper, Overlay } from './styles/Square';
import { useDrop } from 'react-dnd';

import { SquareData } from '../../interfaces/context.interface';

import { TEMPLE_ID_BLUE, TEMPLE_ID_RED } from '../../utils/constants';
import useGameContext from '../../context/useGameContext';
import dndTypes from '../../types/dndTypes';

interface CellProps {
  onSquareClick: (clickedCellID: number) => void;
  renderedSquare: SquareData;
}

const Square: React.FC<CellProps> = ({ onSquareClick, renderedSquare }) => {
  const {
    clickedPiece,
    currentPlayer,
    movePiece,
    pauseGame,
    validMoves,
  } = useGameContext();

  const squareIsValidMove =
    currentPlayer === clickedPiece?.color &&
    validMoves.includes(renderedSquare.id);
  const { id: renderedID, piece: renderedPiece } = renderedSquare;

  const [{ isOver }, drop] = useDrop({
    accept: dndTypes.PIECE,
    drop: () => {
      if (squareIsValidMove && clickedPiece) {
        movePiece(clickedPiece, renderedSquare.id);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const getOverlayColor = (): string => {
    if (isOver) {
      return squareIsValidMove
        ? '#6c0'
        : renderedID === clickedPiece?.currentPositionID
        ? ''
        : '#ffcdd2';
    }
    return '';
  };

  return (
    <SquareWrapper
      highlightClickedPiece={
        !!renderedSquare.piece &&
        renderedSquare.id === clickedPiece?.currentPositionID
      }
      highlightValidSquare={squareIsValidMove}
      hasTempleBackground={
        renderedPiece === undefined &&
        ((renderedID === TEMPLE_ID_BLUE && 'Blue') ||
          (renderedID === TEMPLE_ID_RED && 'Red'))
      }
      isActive={!pauseGame && squareIsValidMove}
      onClick={(): void => onSquareClick(renderedID)}
      ref={drop}
    >
      <Overlay color={getOverlayColor()}>
        {renderedPiece && (
          <Piece
            isActive={!pauseGame && currentPlayer === renderedPiece.color}
            piece={renderedPiece}
          />
        )}
      </Overlay>
    </SquareWrapper>
  );
};

export default Square;
