import styled from 'styled-components';
import { BOARD_GAME } from '../../utils';
import BlueShuriken from '../../assets/blue_shuriken.svg';
import RedShuriken from '../../assets/red_shuriken.svg';

const { COLS } = BOARD_GAME;

export const CardWrapper = styled.div`
  border: 1px solid #000;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
`;

export const TopHalf = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const BottomHalf = styled.div`
  align-self: flex-end;
`;

export const LeftHalf = styled.div`
  margin: 0;
  padding: 0;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
export const RightHalf = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: space-around;
`;

export const Character = styled.div`
  align-self: center;
  margin: 0 auto;
  padding: 0;
  & > img {
    /* height: 6rem; */
    width: 6rem;
  }
`;

export const Name = styled.div`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const MiniBoard = styled.div`
  display: grid;
  height: 8rem;
  grid-template-columns: repeat(${COLS}, 1.6rem);
  grid-template-rows: repeat(${COLS}, 1.6rem);
  border: 1px solid #000;
`;

export const MiniBox = styled.div<{
  center?: boolean;
  hasColor?: string | undefined;
}>`
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  background-color: ${({ center, hasColor }): string =>
    center ? 'black' : hasColor ? hasColor : 'white'};
`;

export const Stamp = styled.div<{ color: 'Blue' | 'Red' }>`
  width: 1.2rem;
  height: 1.2rem;
  background-image: ${({ color }): string =>
    color === 'Blue' ? `url(${BlueShuriken})` : `url(${RedShuriken})`};
  align-self: flex-end;
`;
