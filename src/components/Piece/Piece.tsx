import React from 'react';
import { PieceWrapper, DragSource } from './styles/Piece';
import BlueMaster from '../../assets/_blue/master.svg';
import BlueStudent from '../../assets/_blue/student.svg';
import RedMaster from '../../assets/_red/master.svg';
import RedStudent from '../../assets/_red/student.svg';
import { useDrag } from 'react-dnd';
import ItemTypes from '../../types/ItemTypes';
import useGameContext from '../../context/useGameContext';
import { Piece as IPiece } from '../../interfaces/context.interface';

interface PieceProps {
  isActive: boolean;
  piece: IPiece;
}

const getPieceSVG = (type: string | undefined): string | null => {
  switch (type) {
    case 'Blue-Master':
      return BlueMaster;
    case 'Blue-Student':
      return BlueStudent;
    case 'Red-Master':
      return RedMaster;
    case 'Red-Student':
      return RedStudent;
    default:
      return null;
  }
};

const Piece: React.FC<PieceProps> = ({ isActive, piece }) => {
  const { color, type, currentPositionID } = piece;

  const { board, clickedPiece, setClickedPiece } = useGameContext();

  const [collectedProps, drag] = useDrag({
    item: { id: currentPositionID, type: ItemTypes.PIECE },
    begin: () => ({ id: currentPositionID, type: ItemTypes.PIECE }),
    canDrag: () => isActive,
    collect: monitor => ({
      isClickedForDrag: monitor.isDragging(),
    }),
  });

  if (collectedProps.isClickedForDrag) {
    const draggedPiece = board[currentPositionID].piece;
    if (draggedPiece && draggedPiece !== clickedPiece) {
      setClickedPiece(draggedPiece);
    }
    return (
      <DragSource
        ref={drag}
        hasTempleBackground={
          (currentPositionID === 22 && 'Blue') ||
          (currentPositionID === 2 && 'Red')
        }
      />
    );
  }

  const typeOfPiece = getPieceSVG(`${color}-${type}`);
  return (
    <PieceWrapper isActive={isActive} isRotated={color === 'Red'} ref={drag}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  );
};

export default Piece;
