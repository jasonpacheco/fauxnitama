import styled from 'styled-components/macro';
import BlueShuriken from '../../../assets/_blue/shuriken.svg';
import RedShuriken from '../../../assets/_red/shuriken.svg';
import { PlayerColor } from '../../../interfaces/context.interface';

export const GutterWrapper = styled.div`
  align-self: flex-end;
`;

interface StampTooltipStyleProps {
  invert: boolean;
}

export const StampTooltip = styled.div<StampTooltipStyleProps>`
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
    ${({ invert }): string => (invert ? `transform: rotate(180deg)` : '')};
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
  color: PlayerColor;
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
