import styled from 'styled-components/macro';
import { PieceWrapperStyleProps } from '../../interfaces/styles.interface';

export const PieceWrapper = styled.div<PieceWrapperStyleProps>`
  width: 5.8rem;
  height: 5.8rem;
  ${(props): string => (props.isRotated ? `transform: rotate(180deg)` : '')};
`;
