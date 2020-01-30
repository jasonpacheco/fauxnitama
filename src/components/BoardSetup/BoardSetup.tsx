import React from 'react';
import Board from '../Board/Board';
import Deck from './Deck';
import Card from '../Card/Card';
import { FullWrapper, BoardDeckWrapper, Spacer } from './_BoardSetupStyles';
import CardModel from '../../interfaces/card.interface';

interface BoardSetupProps {
  cards: CardModel[];
  firstPlayerColor: 'Blue' | 'Red';
}

const BoardSetup: React.FC<BoardSetupProps> = ({ cards, firstPlayerColor }) => {
  return (
    <FullWrapper right={firstPlayerColor}>
      <Card card={cards[4]} inverted={firstPlayerColor === 'Red'} />
      <BoardDeckWrapper>
        <Deck isFor='Red' cards={[cards[0], cards[1]]} />
        <Board />
        <Deck isFor='Blue' cards={[cards[2], cards[3]]} />
      </BoardDeckWrapper>
      <Spacer />
    </FullWrapper>
  );
};

export default BoardSetup;
