import React from 'react';
import styled from 'styled-components';
import Piece from '../Piece/Piece';
import { getTempleID } from '../../utils';
import BlueTempleArch from '../../assets/blue_temple_arch.svg';
import RedTempleArch from '../../assets/red_temple_arch.svg';

const {
  blue: { id: blueTempleID },
  red: { id: redTempleID },
} = getTempleID();

interface CellProps {
  id: number;
  x: number;
  y: number;
}

const Box = styled.div<{ hasBackground: string | boolean }>`
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  &:hover {
    cursor: pointer;
  }
  ${({ hasBackground }): string =>
    hasBackground
      ? hasBackground === 'red'
        ? `background: url(${RedTempleArch})`
        : `background: url(${BlueTempleArch})`
      : ''};
`;

const Cell: React.FC<CellProps> = ({ id, x, y }) => {
  return (
    <Box
      key={id}
      hasBackground={
        (id === blueTempleID && 'blue') || (id === redTempleID && 'red')
      }
      onClick={(): void => console.log(`{x:${x},y:${y},id:${id}}`)}
    >
      {id === 2 ? <Piece id={2} /> : id === 22 ? <Piece id={22} /> : 'Box'}
    </Box>
  );
};

export default Cell;
