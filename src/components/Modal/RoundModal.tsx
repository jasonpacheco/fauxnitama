import React, { useState, useEffect } from 'react';
import { RoundModalWrapper, RoundModalButton } from './styles/RoundModal';
import CardModel from '../../interfaces/card.interface';
import useTimer from '../../interactive/useTimer';
import { PlayerColor, WinMethods } from '../../interfaces/context.interface';
import GameEndMessage from './GameEndMessage';
import MoveHistoryModal from './MoveHistoryModal';

interface RoundModalProps {
  clearGameState: () => void;
  clickedCard: CardModel | undefined;
  hasGameFinished: boolean;
  moveHistory: string[][];
  pauseGame: boolean;
  setPassTurn: () => void;
  setPauseGame: (pause: boolean) => void;
  winner: PlayerColor | undefined;
  winMethod: WinMethods | undefined;
}

const RoundModal: React.FC<RoundModalProps> = ({
  clearGameState,
  clickedCard,
  hasGameFinished,
  moveHistory,
  pauseGame,
  setPassTurn,
  setPauseGame,
  winMethod,
  winner,
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
    switch (type) {
      case 'prompt':
        stopTimer();
        setPauseGame(true);
        setShowPrompt(true);
        break;
      case 'yes':
        setShowPrompt(false);
        clearGameState();
        resetTimer();
        startTimer();
        break;
      case 'no':
        setShowPrompt(false);
        setPauseGame(false);
        startTimer();
        break;
      case 'pass':
        if (clickedCard) {
          setPassTurn();
        }
        break;
      case 'pause':
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
          <RoundModalButton onClick={(): void => handleClick('pause')}>
            {pauseGame ? 'Resume Match' : 'Pause'}
          </RoundModalButton>
        </>
      )}

      <MoveHistoryModal moveHistory={moveHistory} />
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
        >
          <MoveHistoryModal moveHistory={moveHistory} />
        </GameEndMessage>
      )}
    </>
  );
};

export default RoundModal;
