import styled from 'styled-components';
import { PlayerColor } from '../../interfaces/context.interface';
/**
 * blue 1976D2
  red D32F2F
 */

export const EndMessageWrapper = styled.div`
  border: 1px solid #333;
  border-radius: 5px;
  text-align: center;
  font-family: 'Arvo', 'Georgia', 'Times New Roman', Times, serif;
  padding: 1rem;
`;

export const EndMessageContent = styled.div<{ winner: PlayerColor }>`
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
  margin-bottom: 1rem;
`;
