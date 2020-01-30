import styled from 'styled-components';
import { BOARD_GAME } from '../../utils';
import BlueShuriken from '../../assets/_blue/shuriken.svg';
import RedShuriken from '../../assets/_red/shuriken.svg';

const { COLS } = BOARD_GAME;

interface CardWrapperStyleProps {
  inverted?: boolean;
  isTurn?: boolean;
}

export const CardWrapper = styled.div<CardWrapperStyleProps>`
  border: 1px solid #000;
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #cacba2;
  ${({ inverted }): string => (inverted ? `transform: rotate(180deg)` : '')};
  ${({ isTurn }): string => (isTurn ? `&:hover { cursor: pointer; }` : '')};
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Gutter = styled.div`
  align-self: flex-end;
`;

export const LeftHalf = styled.div`
  margin: 0;
  padding: 0;
  height: 9rem;
  width: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const RightHalf = styled.div``;

export const Character = styled.div`
  text-align: center;
  height: 6rem;
  & > img {
    width: 8rem;
    height: auto;
  }
`;

export const Name = styled.div`
  font-family: 'Arvo', Georgia, 'Times New Roman', Times, serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  align-self: center;
  padding-top: 1.4rem;
  border-bottom: 1px dotted #333;
`;

export const MiniBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLS}, 1.8rem);
  grid-template-rows: repeat(${COLS}, 1.8rem);
  border: 1px solid #cacba2;
`;
interface MiniBoxStyleProps {
  center?: boolean;
  hasColor?: string | undefined;
}

export const MiniBox = styled.div<MiniBoxStyleProps>`
  margin: 0;
  padding: 0;
  border: 1px solid #979677;
  background-color: ${({ center, hasColor }): string =>
    center ? 'black' : hasColor ? hasColor : 'white'};
`;

interface StampTooltipProps {
  inverted?: boolean;
}

export const StampTooltip = styled.div<StampTooltipProps>`
  font-family: 'Arvo', 'Georgia', serif;
  font-size: 0.8rem;
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 0.2rem;
  padding: 0.5rem;
  width: 10rem;
  position: absolute;
  z-index: 1;
  left: 1.5rem;
  top: -0.5rem;

  & > div {
    ${({ inverted }): string => (inverted ? `transform: rotate(180deg)` : '')};
  }

  &::after {
    content: '';
    position: absolute;
    top: 1rem;
    right: 10rem;
    margin-top: -0.3rem;
    border-width: 0.3rem;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
`;

interface StampStyleProps {
  color: 'Blue' | 'Red';
}

export const Stamp = styled.div<StampStyleProps>`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  background-image: ${({ color }): string =>
    color === 'Blue' ? `url(${BlueShuriken})` : `url(${RedShuriken})`};
  align-self: flex-end;
  display: inline-block;

  &:hover ${StampTooltip} {
    visibility: visible;
  }

  ${StampTooltip} span {
    color: white;
    background-color: ${(props): string =>
      props.color === 'Blue' ? '#1976D2' : '#D32F2F'};
  }
`;
