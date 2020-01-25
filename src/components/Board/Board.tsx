import React from 'react';
import styled from 'styled-components';
import { getIds } from '../../utils';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Board: React.FC = () => {
  return (
    <Grid>
      {getIds().map(({ id, x, y }) => (
        <div key={id}>{`{x:${x},y:${y},id:${id}}`}</div>
      ))}
    </Grid>
  );
};

export default Board;
