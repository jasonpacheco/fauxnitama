import React from 'react';
import styled from 'styled-components';
import Piece from '../Piece/Piece';

interface CellProps {
  id: number;
  x: number;
  y: number;
}

const Box = styled.div`
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  &:hover {
    cursor: pointer;
  }
`;

const Cell: React.FC<CellProps> = ({ id, x, y }) => {
  return (
    <Box key={id} onClick={(): void => console.log(`{x:${x},y:${y},id:${id}}`)}>
      {id === 2 ? (
        <Piece type={'RED_TEMPLE_ARCH'} />
      ) : id === 22 ? (
        <Piece type={'BLUE_TEMPLE_ARCH'} />
      ) : (
        'Box'
      )}
    </Box>
  );
};

export default Cell;
