import styled from 'styled-components/macro';
import { FullWrapperStyleProps } from '../../interfaces/styles.interface';

export const FullWrapper = styled.div<FullWrapperStyleProps>`
  margin: 0 auto;
  width: 80rem;
  display: flex;
  flex-direction: ${({ playerColorToRight }): string =>
    playerColorToRight === 'Blue' ? 'row-reverse' : 'row'};
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
