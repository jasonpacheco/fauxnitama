import styled from 'styled-components';
import { BOARD_GAME } from '../../utils';
const { COLS } = BOARD_GAME;

export const CardWrapper = styled.div`
  border: 1px solid #000;
  width: 15rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`;

export const LeftHalf = styled.div`
  margin: 0;
  padding: 0;
`;
export const RightHalf = styled.div`
  margin: 0;
  padding: 0;
`;

export const Character = styled.div`
  font-size: 4rem;
  font-family: 'Zhi Mang Xing', cursive;
`;

export const Name = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const MiniBoard = styled.div`
  display: grid;
  height: 5rem;
  grid-template-columns: repeat(${COLS}, 1rem);
  grid-template-rows: repeat(${COLS}, 1rem);
  border: 1px solid #000;
`;

export const MiniBox = styled.div<{ center: boolean }>`
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  background-color: ${({ center }): string => (center ? 'black' : 'white')};
`;
