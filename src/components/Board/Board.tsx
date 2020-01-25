import React from 'react';
import styled from 'styled-components';
import { getIds, BOARD_GAME } from '../../utils';
const { COLS } = BOARD_GAME;

const BoardWrapper = styled.div`
  margin: 0 auto;
  width: 30rem;
`;

const Grid = styled.div`
  border: 1px solid #000;
  display: grid;
  height: 30rem;
  grid-template-columns: repeat(${COLS}, 1fr);
`;

const Box = styled.div`
  border: 1px solid #000;
  &:hover {
    cursor: pointer;
  }
`;

const Board: React.FC = () => {
  return (
    <BoardWrapper>
      <Grid>
        {getIds().map(({ id, x, y }) => (
          <Box
            key={id}
            onClick={(): void => console.log(`{x:${x},y:${y},id:${id}}`)}
          >
            Box
          </Box>
        ))}
      </Grid>
    </BoardWrapper>
  );
};

export default Board;
