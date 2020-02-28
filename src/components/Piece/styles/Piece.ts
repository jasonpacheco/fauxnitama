import styled from 'styled-components/macro';

import BlueTempleArch from '../../../assets/_blue/temple_arch.svg';
import RedTempleArch from '../../../assets/_red/temple_arch.svg';

interface PieceWrapperStyleProps {
  isActive: boolean;
  isRotated: boolean;
}

export const PieceWrapper = styled.div<PieceWrapperStyleProps>`
  position: relative;
  width: 5.8rem;
  height: 5.8rem;
  ${(props): string => (props.isRotated ? `transform: rotate(180deg)` : '')};
  ${({ isActive }): string =>
    isActive
      ? `& > img {
    /* position: absolute;
    top: 0px;
    left: 0px; */
    &:hover {
      /* transform: translateX(10px) translateY(10px); */
      transform: scale(1.05);
      transition: transform ease-in-out 0.1s;
      cursor: pointer;
    }
  }`
      : ''}
`;

interface DragSourceProps {
  hasTempleBackground: 'Blue' | 'Red' | boolean;
}

export const DragSource = styled.div<DragSourceProps>`
  height: 6rem;
  width: 6rem;
  ${({ hasTempleBackground }): string =>
    hasTempleBackground
      ? hasTempleBackground === 'Red'
        ? `background-image: url(${RedTempleArch})`
        : `background-image: url(${BlueTempleArch})`
      : ''};
`;
