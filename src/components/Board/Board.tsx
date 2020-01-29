import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import useGameContext from '../../context/useGameContext';

const Board: React.FC = () => {
  const { selectedCard, getBoard } = useGameContext();
  const board = getBoard();
  // useEffect(() => {
  //   board.current = getBoard();
  // }, [selectedCard, getBoard]);
  return (
    <GridWrapper>
      <Grid>
        {board.map(cell => (
          <Cell
            key={cell.id}
            id={cell.id}
            piece={cell.piece}
            isValidCell={cell.isValidMove}
          />
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default Board;
