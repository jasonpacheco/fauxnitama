import styled from 'styled-components/macro';
import { EndMessageContentStyleProps } from '../../interfaces/styles.interface';
import RestartIcon from '../../assets/restart_icon.svg';

export const EndMessageWrapper = styled.div`
  border: 1px solid #333;
  border-radius: 5px;
  text-align: center;
  font-family: 'Arvo', 'Georgia', 'Times New Roman', Times, serif;
  padding: 1rem;
`;

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

export const EndMessageHeader = styled.div`
  text-transform: uppercase;
  font-size: 2.5rem;
  color: #e64a19;
  font-weight: 700;
  margin: 0.5rem;
`;

export const EndMessageButton = styled.button`
  font-family: 'Arvo', Georgia, 'Times New Roman', Times, serif;
  margin: 0.5rem auto;
  padding: 0.5rem;
  font-size: 1.1rem;
  border-radius: 3px;
  display: block;
  outline: none;
  cursor: pointer;
`;

export const RestartGraphic = styled.img.attrs({ src: RestartIcon })`
  width: 1rem;
  margin-left: 0.5rem;
`;

export const RoundModalWrapper = styled(EndMessageWrapper)``;

export const RoundModalButton = styled(EndMessageButton)`
  &:disabled {
    cursor: not-allowed;
  }
`;

export const MoveToken = styled.span<{ color?: string; bold?: boolean }>`
  color: ${({ color }): string => (color ? color : '#000')};
  font-weight: ${({ bold }): string => (bold ? '800' : '400')};
`;
