import React from 'react';

import {
  EndMessageWrapper,
  EndMessageHeader,
  EndMessageContent,
  EndMessageButton,
  RestartGraphic,
} from './_ModalStyles';

import { PlayerColor, WinMethods } from '../../interfaces/context.interface';

interface GameEndMessageProps {
  winner: PlayerColor;
  winMethod: WinMethods;
  clearGameState: () => void;
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  winner,
  winMethod,
  clearGameState,
}) => {
  const handleButtonClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    clearGameState();
  };
  return (
    <EndMessageWrapper>
      <EndMessageHeader>Game Over</EndMessageHeader>
      <EndMessageContent winner={winner}>
        <span className='color--winner'>{winner}</span> wins by capturing{' '}
        <span className='color--loser'>
          {winMethod === 'master-check' ? 'Master' : 'Temple'}
        </span>
        <EndMessageButton
          onClick={(e: React.SyntheticEvent): void => handleButtonClick(e)}
        >
          Restart Game
          <RestartGraphic />
        </EndMessageButton>
      </EndMessageContent>
    </EndMessageWrapper>
  );
};

export default GameEndMessage;
