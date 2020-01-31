import React from 'react';

import {
  EndMessageWrapper,
  EndMessageHeader,
  EndMessageContent,
} from './_ModalStyles';

import { PlayerColor, WinMethods } from '../../interfaces/context.interface';

interface GameEndMessageProps {
  winner: PlayerColor;
  winMethod: WinMethods;
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  winner,
  winMethod,
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
