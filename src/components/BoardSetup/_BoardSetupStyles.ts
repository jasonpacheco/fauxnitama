import styled from 'styled-components';

export const FullWrapper = styled.div<{ right: string }>`
  margin: 0 auto;
  width: 80rem;
  display: flex;
  flex-direction: ${({ right }): string =>
    right === 'Red' ? 'row' : 'row-reverse'};
  align-items: center;
  justify-content: center;
`;

export const BoardHandWrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 40rem;
`;

export const HandWrapper = styled.div`
  display: flex;
`;

export const Spacer = styled.div`
  width: 20rem;
`;
