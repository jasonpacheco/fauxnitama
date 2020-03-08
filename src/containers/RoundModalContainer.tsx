import React, { Fragment, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import GameEndMessage from '../components/Modal/GameEndMessage';
import {
  RoundModalButton,
  RoundModalWrapper,
} from '../components/Modal/styles/RoundModal';
import useTimer from '../interactive/useTimer';
import { AppState } from '../store/engine';
import {
  onClickButtonPass,
  onClickButtonPause,
  onClickButtonYesRestart,
} from '../store/engine/actions/buttonActions';
import { CardName } from '../store/engine/types/cardTypes';
import {
  EndMethod,
  PLAYER_AI,
  PlayerType,
} from '../store/engine/types/gameTypes';
import {
  BUTTON_NO,
  BUTTON_PASS,
  BUTTON_PAUSE,
  BUTTON_PROMPT,
  BUTTON_YES,
} from '../types/buttonStates';
import HistoryModal from './HistoryModalContainer';

type RoundModalContainerProps = PropsFromRedux;

const RoundModalContainer: React.FC<RoundModalContainerProps> = ({
  currentPlayer,
  endMethod,
  isGameComplete,
  pauseGame,
  selectedCardName,
  winner,
  onClickButtonPass,
  onClickButtonPause,
  onClickButtonYesRestart,
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

  useEffect(() => {
    console.log('game paused in useEffect pauseGame is ', pauseGame);
    !pauseGame ? startTimer() : stopTimer();
    // eslint-disable-next-line
  }, [pauseGame]);

  const handleClick = (type: string): void => {
    switch (type) {
      case BUTTON_PROMPT:
        stopTimer();
        onClickButtonPause();
        setShowPrompt(true);
        break;
      case BUTTON_YES:
        setShowPrompt(false);
        onClickButtonYesRestart();
        resetTimer();
        startTimer();
        break;
      case BUTTON_NO:
        setShowPrompt(false);
        onClickButtonPause();
        startTimer();
        break;
      case BUTTON_PASS:
        if (selectedCardName) {
          onClickButtonPass();
        }
        break;
      case BUTTON_PAUSE:
        if (pauseGame === false) {
          console.log('what is causing this');
          stopTimer();
          onClickButtonPause();
        } else {
          startTimer();
          onClickButtonPause();
        }
        break;
      default:
        return;
    }
  };

  return !isGameComplete ? (
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
            disabled={
              selectedCardName === '' ||
              pauseGame ||
              currentPlayer === PLAYER_AI
            }
          >
            Pass Turn
          </RoundModalButton>
          <RoundModalButton
            onMouseDown={(e: React.MouseEvent): void => {
              e.preventDefault();
              handleClick(BUTTON_PAUSE);
            }}
            disabled={currentPlayer === PLAYER_AI}
          >
            {pauseGame ? 'Resume Match' : 'Pause'}
          </RoundModalButton>
        </Fragment>
      )}

      <HistoryModal />
    </RoundModalWrapper>
  ) : (
    <Fragment>
      {endMethod && (
        <GameEndMessage
          formattedTime={formattedTime}
          elapsedTime={elapsedTime}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          startTimer={startTimer}
          endMethod={endMethod}
          winner={winner}
          resetGame={onClickButtonYesRestart}
        >
          <HistoryModal />
        </GameEndMessage>
      )}
    </Fragment>
  );
};

interface StateProps {
  currentPlayer: PlayerType | '';
  endMethod: EndMethod | '';
  isGameComplete: boolean;
  pauseGame: boolean;
  selectedCardName: CardName | '';
  winner: PlayerType | '';
}

const mapStateToProps = (state: AppState): StateProps => {
  const { selectedCardName } = state.cardReducer;
  const {
    pauseGame,
    endMethod,
    winner,
    isGameComplete,
  } = state.gameReducer.properties;
  const { currentPlayer } = state.gameReducer.player;
  return {
    currentPlayer,
    endMethod,
    isGameComplete,
    pauseGame,
    selectedCardName,
    winner,
  };
};

const connector = connect(mapStateToProps, {
  onClickButtonPass,
  onClickButtonPause,
  onClickButtonYesRestart,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RoundModalContainer);
