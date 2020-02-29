import styled from 'styled-components/macro';
import {
  PlayerType,
  Colors,
  PLAYER_AI,
} from '../../../store/engine/types/gameTypes';

interface FullWrapperStyleProps {
  playerColorToRight: PlayerType;
  players: PlayerType[];
}

export const FullWrapper = styled.div<FullWrapperStyleProps>`
  margin: 0 auto;
  width: 80rem;
  display: flex;
  flex-direction: ${({ playerColorToRight, players }): string =>
    playerColorToRight === players[0] ? 'row' : 'row-reverse'};
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
