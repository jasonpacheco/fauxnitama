import React, { Fragment, useEffect } from 'react';

import {
  EndMessageWrapper,
  EndMessageHeader,
  EndMessageContent,
  EndMessageButton,
  RestartGraphic,
} from './styles/GameEndMessage';

import {
  PlayerType,
  EndMethod,
  CAPTURE_MASTER,
  DRAW,
} from '../../store/engine/types/gameTypes';

interface GameEndMessageProps {
  formattedTime: (currentTime: number, alt?: boolean) => string;
  elapsedTime: number;
  stopTimer: () => void;
  resetTimer: () => void;
  startTimer: () => void;
  endMethod: EndMethod | '';
  winner: PlayerType | '';
  resetGame: () => void;
}

const GameEndMessage: React.FC<GameEndMessageProps> = ({
  children,
  elapsedTime,
  formattedTime,
  resetTimer,
  startTimer,
  stopTimer,
  endMethod,
  winner,
  resetGame,
}) => {
  useEffect(() => {
    stopTimer();
    // eslint-disable-next-line
  }, [])

  const handleButtonClick = (): void => {
    resetGame();
    resetTimer();
    startTimer();
  };
  return (
    <EndMessageWrapper>
      <EndMessageHeader>Game Over</EndMessageHeader>
      {endMethod === DRAW ? (
        <Fragment>
          <span>Draw... players reached halfmove limit.</span>
          <span> Game lasted {formattedTime(elapsedTime, true)}.</span>
          <EndMessageButton onClick={(): void => handleButtonClick()}>
            Restart Game
            <RestartGraphic />
          </EndMessageButton>
          {children}
        </Fragment>
      ) : (
        <EndMessageContent winner={winner}>
          <span className='color--winner'>{winner.slice(7)}</span> wins by
          capturing{' '}
          <span className='color--loser'>
            {endMethod === CAPTURE_MASTER ? 'Master' : 'Temple'}
          </span>
          <span> in {formattedTime(elapsedTime, true)}.</span>
          <EndMessageButton onClick={(): void => handleButtonClick()}>
            Restart Game
            <RestartGraphic />
          </EndMessageButton>
          {children}
        </EndMessageContent>
      )}
    </EndMessageWrapper>
  );
};

export default GameEndMessage;
