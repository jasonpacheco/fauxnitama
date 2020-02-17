import React from 'react';
import { connect } from 'react-redux';
import BoardSetup from '../components/BoardSetup/BoardSetupNew';

import { getCards } from '../store/engine/card/reducers';
import { NEXT_CARD, HAND_RED, HAND_BLUE } from '../store/engine/card/types';
import { AppState } from '../store/engine';
import { CardName } from '../store/engine/card/types';

interface BoardSetupContainerProps {
  handBlue: CardName[];
  handRed: CardName[];
  nextCard: CardName[];
}

const BoardSetupContainer: React.FC<BoardSetupContainerProps> = ({
  handBlue,
  handRed,
  nextCard,
}) => <BoardSetup hands={[handBlue, handRed]} nextCard={nextCard[0]} />;

interface StateProps {
  handBlue: CardName[];
  handRed: CardName[];
  nextCard: CardName[];
}

const mapStateToProps = (state: AppState): StateProps => {
  const { cards } = state.card;
  return {
    handBlue: getCards(cards, HAND_BLUE),
    handRed: getCards(cards, HAND_RED),
    nextCard: getCards(cards, NEXT_CARD),
  };
};

export default connect(mapStateToProps)(BoardSetupContainer);
