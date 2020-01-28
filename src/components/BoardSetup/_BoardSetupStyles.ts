import styled from 'styled-components';

export const FullWrapper = styled.div<{ right: string }>`
  margin: 0 auto;
  width: 80rem;
  border: 1px solid #000;
  display: flex;
  flex-direction: ${({ right }): string =>
    right === 'Red' ? 'row' : 'row-reverse'};
  align-items: center;
  justify-content: center;
`;

export const BoardDeckWrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 40rem;
`;

export const DeckWrapper = styled.div`
  display: flex;
`;

export const Spacer = styled.div`
  width: 20rem;
`;
