import styled from 'styled-components/macro';
import { PieceWrapperStyleProps } from '../../interfaces/styles.interface';

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
