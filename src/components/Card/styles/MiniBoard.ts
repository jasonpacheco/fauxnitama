import styled from 'styled-components/macro';
import { BOARD_COLS as COLS } from '../../../utils/constants';

export const MiniBoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLS}, 1.8rem);
  grid-template-rows: repeat(${COLS}, 1.8rem);
  border: 1px solid #cacba2;
`;

interface MiniCellStyleProps {
  moveColor: string;
  value: string;
}

export const MiniCell = styled.div<MiniCellStyleProps>`
  margin: 0;
  padding: 0;
  border: 1px solid #979677;
  background-color: ${({ moveColor, value }): string =>
    value === 'X' ? '#000' : value === 'C' ? moveColor : '#fff'};
`;
