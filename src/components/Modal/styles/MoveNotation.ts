import styled from 'styled-components/macro';

export const NotationToken = styled.span<{ color?: string; bold?: boolean }>`
  color: ${({ color }): string => (color ? color : '#000')};
  font-weight: ${({ bold }): string => (bold ? '800' : '400')};
  font-size: 1rem;
  font-family: Helvetica, Arial, sans-serif;
`;
