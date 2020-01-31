import React from 'react';

import {
  EndMessageWrapper,
  EndMessageHeader,
  EndMessageContent,
} from './_ModalStyles';

interface GameEndMessageProps {
  isGameOver?: boolean;
  winningPlayer?: 'Blue' | 'Red';
  victoryMethod?: 'master-check' | 'temple-check';
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  isGameOver = true,
  winningPlayer = 'Red',
  victoryMethod = 'master-check',
}) => {
  return isGameOver ? (
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
  ) : (
    <></>
  );
};

export default GameEndMessage;
