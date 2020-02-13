import styled from 'styled-components/macro';
import RestartIcon from '../../../assets/restart_icon.svg';
import { Button, Wrapper } from '../styles';
import { PlayerColor } from '../../../interfaces/context.interface';

export const EndMessageWrapper = styled(Wrapper)``;

export const EndMessageHeader = styled.div`
  text-transform: uppercase;
  font-size: 2.5rem;
  color: #e64a19;
  font-weight: 700;
  margin: 0.5rem;
`;

interface EndMessageContentStyleProps {
  winner: PlayerColor;
}

export const EndMessageContent = styled.div<EndMessageContentStyleProps>`
  & {
    .color--winner {
      color: ${(props): string =>
        props.winner === 'Blue' ? '#1976D2' : '#D32F2F'};
    }

    .color--loser {
      color: ${(props): string =>
        props.winner === 'Blue' ? '#D32F2F' : '#1976D2'};
    }
  }
`;

export const EndMessageButton = styled(Button)``;

export const RestartGraphic = styled.img.attrs({ src: RestartIcon })`
  width: 1rem;
  margin-left: 0.5rem;
`;
