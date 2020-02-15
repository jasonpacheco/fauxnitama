import React, { Fragment, useEffect, useState } from 'react';
import { RoundModalWrapper, RoundModalButton } from './styles/RoundModal';
import useTimer from '../../interactive/useTimer';
import useKeyPress from '../../interactive/useKeyPress';
import GameEndMessage from './GameEndMessage';
import MoveHistoryModal from './MoveHistoryModal';
import {
  BUTTON_NO,
  BUTTON_PASS,
  BUTTON_PAUSE,
  BUTTON_PROMPT,
  BUTTON_YES,
} from '../../types/buttonStates';
import useGameContext from '../../context/useGameContext';

const RoundModal: React.FC = () => {
  const {
    clearGameState,
    clickedCard,
    hasGameFinished,
    pauseGame,
    setPassTurn,
    setPauseGame,
    winMethod,
  } = useGameContext();
  const [showPrompt, setShowPrompt] = useState(false);
  const {
    elapsedTime,
    resetTimer,
    startTimer,
    stopTimer,
    formattedTime,
  } = useTimer();

  const onPressDown = (): void => {
    setPauseGame(!pauseGame);
    !pauseGame ? stopTimer() : startTimer();
  };

  useKeyPress(' ', onPressDown);

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line
  }, []);

  const handleClick = (type: string): void => {
    switch (type) {
      case BUTTON_PROMPT:
        stopTimer();
        setPauseGame(true);
        setShowPrompt(true);
        break;
      case BUTTON_YES:
        setShowPrompt(false);
        clearGameState();
        resetTimer();
        startTimer();
        break;
      case BUTTON_NO:
        setShowPrompt(false);
        setPauseGame(false);
        startTimer();
        break;
      case BUTTON_PASS:
        if (clickedCard) {
          setPassTurn();
        }
        break;
      case BUTTON_PAUSE:
        if (!pauseGame) {
          stopTimer();
          setPauseGame(true);
        } else {
          setPauseGame(false);
          startTimer();
        }
        break;
      default:
        return;
    }
  };

  return !hasGameFinished ? (
    <RoundModalWrapper>
      {formattedTime(elapsedTime)}
      {showPrompt ? (
        <Fragment>
          <p>
            Are you sure you want to end the current match and start a new one?
          </p>
          <RoundModalButton onClick={(): void => handleClick(BUTTON_NO)}>
            No
          </RoundModalButton>
          <RoundModalButton onClick={(): void => handleClick(BUTTON_YES)}>
            Yes
          </RoundModalButton>
        </Fragment>
      ) : (
        <Fragment>
          <RoundModalButton onClick={(): void => handleClick(BUTTON_PROMPT)}>
            End and Restart Match
          </RoundModalButton>
          <RoundModalButton
            onClick={(): void => handleClick(BUTTON_PASS)}
            disabled={clickedCard === undefined || pauseGame}
          >
            Pass Turn
          </RoundModalButton>
          <RoundModalButton onClick={(): void => handleClick(BUTTON_PAUSE)}>
            {pauseGame ? 'Resume Match' : 'Pause'}
          </RoundModalButton>
        </Fragment>
      )}

      <MoveHistoryModal />
    </RoundModalWrapper>
  ) : (
    <Fragment>
      {winMethod && (
        <GameEndMessage
          formattedTime={formattedTime}
          elapsedTime={elapsedTime}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          startTimer={startTimer}
        >
          <MoveHistoryModal />
        </GameEndMessage>
      )}
    </Fragment>
  );
};

export default RoundModal;
