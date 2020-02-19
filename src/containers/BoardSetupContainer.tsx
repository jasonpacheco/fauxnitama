import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import BoardSetup from '../components/BoardSetup/BoardSetupNew';

import { NEXT_CARD, HAND_RED, HAND_BLUE } from '../store/engine/card/types';
import { AppState } from '../store/engine';
import { CardName } from '../store/engine/card/types';
import { selectCard } from '../store/engine/card/actions';
import { getCards } from '../store/utils';

interface StateProps {
  handBlue: CardName[];
  handRed: CardName[];
  nextCard: CardName[];
}

type BoardSetupContainerProps = PropsFromRedux;

const BoardSetupContainer: React.FC<BoardSetupContainerProps> = ({
  handBlue,
  handRed,
  nextCard,
  selectCard,
}) => (
  <BoardSetup
    hands={[handBlue, handRed]}
    nextCard={nextCard[0]}
    selectCard={selectCard}
  />
);

const mapStateToProps = (state: AppState): StateProps => {
  const { cards } = state.card;
  return {
    handBlue: getCards(cards, HAND_BLUE),
    handRed: getCards(cards, HAND_RED),
    nextCard: getCards(cards, NEXT_CARD),
  };
};

const connector = connect(mapStateToProps, {
  selectCard,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BoardSetupContainer);
