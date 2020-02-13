import React from 'react';
import Piece from '../../components/Piece/Piece';
import { useValue } from 'react-cosmos/fixture';
import { Piece as IPiece } from '../../interfaces/context.interface';

const FPiece: React.FC = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const [piece] = useValue<IPiece>('piece', {
    defaultValue: {
      type: 'Master',
      color: 'Blue',
      currentPositionID: 10,
    },
  });

  return <Piece piece={piece} isActive />;
};

export default FPiece;
