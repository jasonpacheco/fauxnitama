import React from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import { FullWrapper, BoardHandWrapper, Spacer } from './_BoardSetupStyles';
import CardModel from '../../interfaces/card.interface';
import useGameContext from '../../context/useGameContext';

interface BoardSetupProps {
  cards: CardModel[];
  firstPlayerColor: 'Blue' | 'Red';
}

const BoardSetup: React.FC<BoardSetupProps> = ({ cards, firstPlayerColor }) => {
  const { nextCard } = useGameContext();
  return (
    <FullWrapper right={firstPlayerColor}>
      <Card card={nextCard} inverted={firstPlayerColor === 'Red'} />
      <BoardHandWrapper>
        <Hand isFor='Red' cards={[cards[0], cards[1]]} />
        <Board />
        <Hand isFor='Blue' cards={[cards[2], cards[3]]} />
      </BoardHandWrapper>
      <Spacer />
    </FullWrapper>
  );
};

export default BoardSetup;
