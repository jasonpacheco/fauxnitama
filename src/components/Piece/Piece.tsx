import React from 'react';
import { PieceWrapper } from './_PieceStyles';
import BlueMaster from '../../assets/_blue/master.svg';
import BlueStudent from '../../assets/_blue/student.svg';
import RedMaster from '../../assets/_red/master.svg';
import RedStudent from '../../assets/_red/student.svg';

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
  const typeOfPiece = getPieceSVG(`${color}-${type}`);
  return (
    <PieceWrapper isActive={isActive} isRotated={color === 'Red'}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  );
};

export default Piece;
