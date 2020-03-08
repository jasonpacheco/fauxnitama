import styled from 'styled-components/macro';

import { Button, Wrapper } from '../styles';

export const RoundModalWrapper = styled(Wrapper)``;

export const RoundModalButton = styled(Button)`
  &:disabled {
    cursor: not-allowed;
  }
`;
