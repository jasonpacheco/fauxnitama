import styled from 'styled-components/macro';
import { PlayerType, Colors } from '../../../store/engine/types/gameTypes';

interface FullWrapperStyleProps {
  playerColorToRight: PlayerType;
  colors: Colors[];
}

export const FullWrapper = styled.div<FullWrapperStyleProps>`
  margin: 0 auto;
  width: 80rem;
  display: flex;
  flex-direction: ${({ playerColorToRight, colors }): string =>
    playerColorToRight.includes(colors[0]) ? 'row' : 'row-reverse'};
  align-items: center;
  justify-content: center;
`;

export const BoardHandWrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 40rem;
`;

export const Spacer = styled.div`
  width: 20rem;
`;
