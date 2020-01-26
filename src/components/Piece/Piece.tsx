import React from 'react';
import styled from 'styled-components';
import { PIECES } from '../../utils';
import BlueMaster from '../../assets/blue_master.svg';
import BlueStudent from '../../assets/blue_student.svg';
import BlueTempleArch from '../../assets/blue_temple_arch.svg';
import RedMaster from '../../assets/red_master.svg';
import RedStudent from '../../assets/red_student.svg';
import RedTempleArch from '../../assets/red_temple_arch.svg';

interface PieceProps {
  type: string;
}

const PieceWrapper = styled.div<{ isRotated: boolean }>`
  ${(props): string => (props.isRotated ? `transform: rotate(180deg)` : '')};
`;

const getPieceGraphic = (type: string): string | null => {
  switch (type) {
    case PIECES[0]:
      return BlueMaster;
    case PIECES[1]:
      return BlueStudent;
    case PIECES[2]:
      return BlueTempleArch;
    case PIECES[3]:
      return RedMaster;
    case PIECES[4]:
      return RedStudent;
    case PIECES[5]:
      return RedTempleArch;
    default:
      return null;
  }
};

const Piece: React.FC<PieceProps> = ({ type }) => {
  const typeOfPiece = getPieceGraphic(type);
  return (
    <PieceWrapper isRotated={type.startsWith('RED')}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  );
};

export default Piece;
