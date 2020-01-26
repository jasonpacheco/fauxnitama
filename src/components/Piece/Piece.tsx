import React from 'react';
import { PieceWrapper } from './_PieceStyles';
import BlueMaster from '../../assets/blue_master.svg';
import BlueStudent from '../../assets/blue_student.svg';
import RedMaster from '../../assets/red_master.svg';
import RedStudent from '../../assets/red_student.svg';

interface PieceProps {
  type: 'Student' | 'Master';
  color: 'Blue' | 'Red';
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

const Piece: React.FC<PieceProps> = ({ type, color }) => {
  const typeOfPiece = getPieceSVG(`${color}-${type}`);

  return type ? (
    <PieceWrapper isRotated={color === 'Red'}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  ) : (
    <>Hello</>
  );
};

export default Piece;
