import React from 'react';
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
  const handleClick = (type: string): void => {
    if (type === 'restart') {
      clearGameState();
    } else {
      if (clickedCard) {
        setPassTurn();
      }
    }
  };

  return (
    <RoundModalWrapper>
      <RoundModalButton onClick={(): void => handleClick('restart')}>
        End and Restart Match
      </RoundModalButton>
      <RoundModalButton onClick={(): void => handleClick('pass')}>
        Pass Turn
      </RoundModalButton>
    </RoundModalWrapper>
  );
};

export default RoundModal;
