import React, { Fragment } from 'react';
import { NotationToken } from './styles/MoveNotation';

interface MoveNotationProps {
  tokens: string[];
}

const MoveNotation: React.FC<MoveNotationProps> = ({ tokens }) => {
  // Sample array for tokens:
  // ['Ox', 'BMa3', ' ', 'b3'] => Ox Ma3 b3
  // ['Monkey', 'Rc2', 'xB', 'd3'] => Monkey c2xd3
  // ['Rooster', 'BP', '', ' pt '] => Rooster P pt

  if (!tokens) {
    return <Fragment></Fragment>;
  }

  const captChar = `${tokens[2].charAt(0)}`; // 'x' symbol for a capture
  const captPiece = tokens[2].slice(1); // e.g. 'BM' | 'RM' or 'B' | 'R' for students

  return (
    <Fragment>
      <NotationToken color={'green'}>{`${tokens[0]} `}</NotationToken>
      <NotationToken color={tokens[1].startsWith('B') ? '#1976D2' : '#D32F2F'}>
        {tokens[1]}
      </NotationToken>
      <NotationToken bold>{captChar}</NotationToken>
      <NotationToken color={captPiece.startsWith('B') ? '#1976D2' : '#D32F2F'}>
        {captPiece}
      </NotationToken>
      <NotationToken
        color={
          (captPiece.startsWith('B') && '#1976D2') ||
          (captPiece.startsWith('R') && '#D32F2F') ||
          '#000'
        }
      >
        {tokens[3]}
      </NotationToken>
      <NotationToken bold>{tokens[4]}</NotationToken>
      <br />
    </Fragment>
  );
};

export default MoveNotation;
