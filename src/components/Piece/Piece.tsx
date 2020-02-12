import React from 'react';
import { PieceWrapper } from './styles/Piece';
import BlueMaster from '../../assets/_blue/master.svg';
import BlueStudent from '../../assets/_blue/student.svg';
import RedMaster from '../../assets/_red/master.svg';
import RedStudent from '../../assets/_red/student.svg';
import { useDrag } from 'react-dnd';
import ItemTypes from '../../types/ItemTypes';

interface PieceProps {
  color: 'Blue' | 'Red';
  isActive: boolean;
  type: 'Master' | 'Student';
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

const Piece: React.FC<PieceProps> = ({ color, isActive, type }) => {
  const [collectedProps, drag] = useDrag({
    item: { color, pieceType: type, type: ItemTypes.PIECE },
    canDrag: () => isActive,
    collect: monitor => ({
      isClickedForDrag: monitor.isDragging(),
    }),
  });
  console.log(collectedProps.isClickedForDrag);
  const typeOfPiece = getPieceSVG(`${color}-${type}`);
  return (
    <PieceWrapper isActive={isActive} isRotated={color === 'Red'} ref={drag}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  );
};

export default Piece;
