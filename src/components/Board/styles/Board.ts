import styled from 'styled-components/macro';
import { BOARD_COLS as COLS } from '../../../utils/constants';

export const GridWrapper = styled.div`
  margin: 0 auto;
  width: 34rem;
`;

export const Grid = styled.div`
  outline: 1px solid #000;
  display: grid;
  margin: 0 auto;
  height: 30rem;
  width: 30rem;
  grid-template-columns: repeat(${COLS}, 6rem);
  grid-template-rows: repeat(${COLS}, 6rem);
`;

interface GridLegendProps {
  invert?: boolean;
}

export const GridLegend = styled.div<GridLegendProps>`
  display: grid;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
  & > span {
    text-align: center;
    margin: auto;
  }
  ${({ invert }): string => (invert ? `transform: rotate(180deg)` : '')};
`;

export const NumberRow = styled(GridLegend)`
  grid-template-columns: repeat(${COLS}, 6rem);
  height: 2rem;
  width: 30rem;
  margin: 0 auto;
`;

export const LetterColumn = styled(GridLegend)`
  grid-template-rows: repeat(${COLS}, 6rem);
  width: 2rem;
`;
