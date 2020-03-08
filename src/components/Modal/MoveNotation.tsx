import React, { Fragment } from 'react';

import { NotationToken } from './styles/MoveNotation';

interface MoveNotationProps {
  tokens: string[] | undefined;
}

const MoveNotation: React.FC<MoveNotationProps> = ({ tokens }) => {
  // Sample array for tokens:
  // ['Ox', 'BMa3', ' ', 'b3'] => Ox Ma3 b3
  // ['Monkey', 'Rc2', 'xB', 'd3'] => Monkey c2xd3
  // ['Rooster', 'BP', '', ' pt '] => Rooster P pt

  if (!tokens) {
    return <Fragment></Fragment>;
  }
  const [card, fromSquare, capturedEntity, toSquare, checkMove] = tokens;

  const captureSymbol = capturedEntity.charAt(0); // 'x' symbol for a capture
  const capturedPiece = capturedEntity.slice(1); // e.g. 'BM' | 'RM' or 'B' | 'R' for students

  return (
    <Fragment>
      <NotationToken color={'green'}>{`${card} `}</NotationToken>

      <NotationToken color={fromSquare.startsWith('B') ? '#1976D2' : '#D32F2F'}>
        {fromSquare}
      </NotationToken>

      <NotationToken bold>{captureSymbol}</NotationToken>

      <NotationToken
        color={capturedPiece.startsWith('B') ? '#1976D2' : '#D32F2F'}
      >
        {capturedPiece}
      </NotationToken>

      <NotationToken
        color={
          (capturedPiece.startsWith('B') && '#1976D2') ||
          (capturedPiece.startsWith('R') && '#D32F2F') ||
          '#000'
        }
      >
        {toSquare}
      </NotationToken>

      <NotationToken bold>{checkMove}</NotationToken>
      <br />
    </Fragment>
  );
};

export default React.memo(MoveNotation);
