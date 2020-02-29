import React, { Fragment, useEffect, useState } from 'react';
import useTimer from '../interactive/useTimer';
import useKeyPress from '../interactive/useKeyPress';
import {
  BUTTON_PROMPT,
  BUTTON_YES,
  BUTTON_NO,
  BUTTON_PASS,
  BUTTON_PAUSE,
} from '../types/buttonStates';
import {
  RoundModalWrapper,
  RoundModalButton,
} from '../components/Modal/styles/RoundModal';
import HistoryModal from './HistoryModalContainer';
import GameEndMessage from '../components/Modal/GameEndMessage';
import { connect, ConnectedProps } from 'react-redux';
import {
  onClickButtonYesRestart,
  onClickButtonPass,
  onClickButtonPause,
} from '../store/engine/actions/buttonActions';
import { AppState } from '../store/engine';
import { CardName } from '../store/engine/types/cardTypes';
import {
  EndMethod,
  PlayerType,
  PLAYER_AI,
} from '../store/engine/types/gameTypes';

type RoundModalContainerProps = PropsFromRedux;

const RoundModalContainer: React.FC<RoundModalContainerProps> = ({
  pauseGame,
  selectedCardName,
  isGameComplete,
  endMethod,
  winner,
  onClickButtonYesRestart,
  onClickButtonPass,
  onClickButtonPause,
  currentPlayer,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const {
    elapsedTime,
    resetTimer,
    startTimer,
    stopTimer,
    formattedTime,
  } = useTimer();

  const onPressDown = (): void => {
    onClickButtonPause();
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
        if (!pauseGame) {
          stopTimer();
        } else {
          startTimer();
        }
        onClickButtonPause();
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
            onClick={(): void => handleClick(BUTTON_PAUSE)}
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
  pauseGame: boolean;
  selectedCardName: CardName | '';
  isGameComplete: boolean;
  endMethod: EndMethod | '';
  winner: PlayerType | '';
  currentPlayer: PlayerType | '';
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
    pauseGame,
    selectedCardName,
    isGameComplete,
    endMethod,
    winner,
    currentPlayer,
  };
};

const connector = connect(mapStateToProps, {
  onClickButtonYesRestart,
  onClickButtonPass,
  onClickButtonPause,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RoundModalContainer);
