import React, { useState } from 'react';
import { RoundModalWrapper, RoundModalButton } from '../Modal/_ModalStyles';
import CardModel from '../../interfaces/card.interface';

interface RoundModalProps {
  clearGameState: () => void;
  clickedCard: CardModel | undefined;
  setPassTurn: () => void;
}

const RoundModal: React.FC<RoundModalProps> = ({
  clearGameState,
  clickedCard,
  setPassTurn,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = (type: string): void => {
    if (type === 'prompt') {
      setShowPrompt(true);
    } else if (type === 'yes') {
      setShowPrompt(false);
      clearGameState();
    } else if (type === 'no') {
      setShowPrompt(false);
    } else {
      if (clickedCard) {
        setPassTurn();
      }
    }
  };

  return (
    <RoundModalWrapper>
      {showPrompt ? (
        <>
          <p>Are you sure you want to end and restart?</p>
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
  );
};

export default RoundModal;
