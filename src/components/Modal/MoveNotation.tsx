import React from 'react';
import { MoveToken } from './_ModalStyles';

interface MoveNotationProps {
  tokens: string[];
}

const MoveNotation: React.FC<MoveNotationProps> = ({ tokens }) => {
  // Sample array for tokens:
  // ['BMa3', ' ', 'b3', 'Ox'] => Ox Ma3 b3
  // ['Rc2', 'xB', 'd3', 'Monkey'] => Monkey c2xd3
  // ['BP', '', ' pt ', 'Rooster'] => Rooster P pt

  if (!tokens) {
    return <></>;
  }

  const captChar = `${tokens[1].charAt(0)}`; // 'x' symbol for a capture
  const captPiece = tokens[1].slice(1); // e.g. 'BM' | 'RM' or 'B' | 'R' for students

  return (
    <React.Fragment>
      <MoveToken color={'green'}>{`${tokens[3]} `}</MoveToken>
      <MoveToken color={tokens[0].startsWith('B') ? '#1976D2' : '#D32F2F'}>
        {tokens[0]}
      </MoveToken>
      <MoveToken bold>{captChar}</MoveToken>
      <MoveToken color={captPiece.startsWith('B') ? '#1976D2' : '#D32F2F'}>
        {captPiece}
      </MoveToken>
      <MoveToken
        color={
          (captPiece.startsWith('B') && '#1976D2') ||
          (captPiece.startsWith('R') && '#D32F2F') ||
          '#000'
        }
      >
        {tokens[2]}
      </MoveToken>
      <MoveToken bold>{tokens[4]}</MoveToken>
      <br />
    </React.Fragment>
  );
};

export default MoveNotation;
