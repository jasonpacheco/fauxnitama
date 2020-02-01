import React from 'react';
import { PieceWrapper } from './_PieceStyles';
import BlueMaster from '../../assets/_blue/master.svg';
import BlueStudent from '../../assets/_blue/student.svg';
import RedMaster from '../../assets/_red/master.svg';
import RedStudent from '../../assets/_red/student.svg';

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
    <></>
  );
};

export default React.memo(Piece, (prevProps, nextProps) => {
  return (
    prevProps.color === nextProps.color && prevProps.type === nextProps.type
  );
});
