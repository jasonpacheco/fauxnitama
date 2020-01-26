import React from 'react';
import { PieceWrapper } from './_PieceStyles';
import { PIECES } from '../../utils';
import BlueMaster from '../../assets/blue_master.svg';
import BlueStudent from '../../assets/blue_student.svg';
import RedMaster from '../../assets/red_master.svg';
import RedStudent from '../../assets/red_student.svg';

interface PieceProps {
  type?: string;
  id: number;
}

const getPieceSVG = (type: string | undefined): string | null => {
  switch (type) {
    case PIECES[0]:
      return BlueMaster;
    case PIECES[1]:
      return BlueStudent;
    case PIECES[3]:
      return RedMaster;
    case PIECES[4]:
      return RedStudent;
    default:
      return null;
  }
};

const Piece: React.FC<PieceProps> = ({ type, id }) => {
  const typeOfPiece = getPieceSVG(type);

  return type ? (
    <PieceWrapper isRotated={type.startsWith('RED')}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  ) : (
    <>Hello</>
  );
};

export default Piece;
