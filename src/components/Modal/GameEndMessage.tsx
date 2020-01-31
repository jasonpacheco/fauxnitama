import React from 'react';

import { MessageWrapper } from './_ModalStyles';

interface GameEndMessageProps {
  test?: string;
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({}) => {
  return <MessageWrapper>Game Has Ended</MessageWrapper>;
};

export default GameEndMessage;
