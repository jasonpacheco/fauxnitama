import React from 'react';

import Square from '../../containers/SquareContainer';
import { getIDs } from '../../utils';
import { Grid, GridWrapper, LetterColumn, NumberRow } from './styles/Board';

interface BoardProps {
  onClickSquare: (selectedSquareID: number) => void;
}
const Board: React.FC<BoardProps> = ({ onClickSquare }) => {
  const handleClickSquare = (selectedSquareID: number): void => {
    onClickSquare(selectedSquareID);
  };

  return (
    <GridWrapper>
      <NumberRow>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </NumberRow>
      <div style={{ display: 'flex' }}>
        <LetterColumn>
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
        </LetterColumn>
        <Grid>
          {getIDs().map((id: number) => (
            <Square
              key={id}
              handleClickSquare={handleClickSquare}
              squareID={id}
            />
          ))}
        </Grid>
        <LetterColumn invert>
          <span>E</span>
          <span>D</span>
          <span>C</span>
          <span>B</span>
          <span>A</span>
        </LetterColumn>
      </div>
      <NumberRow invert>
        <span>5</span>
        <span>4</span>
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </NumberRow>
    </GridWrapper>
  );
};

export default Board;
