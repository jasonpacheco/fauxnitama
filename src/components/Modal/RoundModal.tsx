import React, { useState, useEffect } from 'react';
import { RoundModalWrapper, RoundModalButton } from '../Modal/_ModalStyles';
import CardModel from '../../interfaces/card.interface';
import useTimer from '../../interactive/useTimer';
import { PlayerColor, WinMethods } from '../../interfaces/context.interface';
import GameEndMessage from './GameEndMessage';

interface RoundModalProps {
  clearGameState: () => void;
  clickedCard: CardModel | undefined;
  setPassTurn: () => void;
  hasGameFinished: boolean;
  winner: PlayerColor | undefined;
  winMethod: WinMethods | undefined;
}

const RoundModal: React.FC<RoundModalProps> = ({
  clearGameState,
  clickedCard,
  setPassTurn,
  hasGameFinished,
  winner,
  winMethod,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const {
    elapsedTime,
    resetTimer,
    startTimer,
    stopTimer,
    formattedTime,
  } = useTimer();

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line
  }, []);

  const handleClick = (type: string): void => {
    if (type === 'prompt') {
      stopTimer();
      setShowPrompt(true);
    } else if (type === 'yes') {
      setShowPrompt(false);
      clearGameState();
      resetTimer();
      startTimer();
    } else if (type === 'no') {
      setShowPrompt(false);
      startTimer();
    } else {
      if (clickedCard) {
        setPassTurn();
      }
    }
  };

  return !hasGameFinished ? (
    <RoundModalWrapper>
      {formattedTime(elapsedTime)}
      {showPrompt ? (
        <>
          <p>
            Are you sure you want to end the current match and start a new one?
          </p>
          <RoundModalButton onClick={(): void => handleClick('no')}>
            No
          </RoundModalButton>
          <RoundModalButton onClick={(): void => handleClick('yes')}>
            Yes
          </RoundModalButton>
        </>
      ) : (
        <>
          <RoundModalButton onClick={(): void => handleClick('prompt')}>
            End and Restart Match
          </RoundModalButton>
          <RoundModalButton
            onClick={(): void => handleClick('pass')}
            disabled={clickedCard === undefined}
          >
            Pass Turn
          </RoundModalButton>
        </>
      )}
    </RoundModalWrapper>
  ) : (
    <>
      {winner && winMethod && (
        <GameEndMessage
          winner={winner}
          winMethod={winMethod}
          clearGameState={clearGameState}
          formattedTime={formattedTime}
          elapsedTime={elapsedTime}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          startTimer={startTimer}
        />
      )}
    </>
  );
};

export default RoundModal;
