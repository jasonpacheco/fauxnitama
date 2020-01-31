import React from 'react';

import {
  EndMessageWrapper,
  EndMessageHeader,
  EndMessageContent,
} from './_ModalStyles';

interface GameEndMessageProps {
  winningPlayer?: 'Blue' | 'Red';
  victoryMethod?: 'master-check' | 'temple-check';
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  winningPlayer = 'Red',
  victoryMethod = 'master-check',
}) => {
  return (
    <EndMessageWrapper>
      <EndMessageHeader>Game Over</EndMessageHeader>
      <EndMessageContent winner={winningPlayer}>
        <span className='color--winner'>{winningPlayer}</span> wins by capturing{' '}
        <span className='color--loser'>
          {victoryMethod === 'master-check' ? 'master' : 'temple'}
        </span>
        !
      </EndMessageContent>
    </EndMessageWrapper>
  );
};

export default GameEndMessage;
