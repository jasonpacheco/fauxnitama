import React from 'react';

import {
  EndMessageWrapper,
  EndMessageHeader,
  EndMessageContent,
} from './_ModalStyles';

interface GameEndMessageProps {
  winner?: 'Blue' | 'Red';
  winMethod?: 'master-check' | 'temple-check';
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  winner = 'Red',
  winMethod = 'master-check',
}) => {
  return (
    <EndMessageWrapper>
      <EndMessageHeader>Game Over</EndMessageHeader>
      <EndMessageContent winner={winner}>
        <span className='color--winner'>{winner}</span> wins by capturing{' '}
        <span className='color--loser'>
          {winMethod === 'master-check' ? 'master' : 'temple'}
        </span>
        !
      </EndMessageContent>
    </EndMessageWrapper>
  );
};

export default GameEndMessage;
