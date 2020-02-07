import React, { useEffect } from 'react';

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
  formattedTime: (currentTime: number, alt?: boolean) => string;
  elapsedTime: number;
  stopTimer: () => void;
  resetTimer: () => void;
  startTimer: () => void;
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  children,
  clearGameState,
  elapsedTime,
  formattedTime,
  resetTimer,
  startTimer,
  stopTimer,
  winMethod,
  winner,
}) => {
  useEffect(() => {
    stopTimer();
    // eslint-disable-next-line
  }, [])

  const handleButtonClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    clearGameState();
    resetTimer();
    startTimer();
  };
  return (
    <EndMessageWrapper>
      <EndMessageHeader>Game Over</EndMessageHeader>
      <EndMessageContent winner={winner}>
        <span className='color--winner'>{winner}</span> wins by capturing{' '}
        <span className='color--loser'>
          {winMethod === 'master-check' ? 'Master' : 'Temple'}
        </span>
        <span> in {formattedTime(elapsedTime, true)}.</span>
        <EndMessageButton
          onClick={(e: React.SyntheticEvent): void => handleButtonClick(e)}
        >
          Restart Game
          <RestartGraphic />
        </EndMessageButton>
        {children}
      </EndMessageContent>
    </EndMessageWrapper>
  );
};

export default GameEndMessage;
