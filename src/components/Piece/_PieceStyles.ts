import styled from 'styled-components';

export const PieceWrapper = styled.div<{
  isRotated: boolean;
}>`
  width: 5.9rem;
  height: 5.9rem;
  ${(props): string => (props.isRotated ? `transform: rotate(180deg)` : '')};
`;
