import React, { Fragment, useState } from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import RoundModal from '../Modal/RoundModal';
import { FullWrapper, BoardHandWrapper, Spacer } from './styles/BoardSetup';
import useGameContext from '../../context/useGameContext';
import isEqual from 'lodash.isequal';
import CardModel from '../../interfaces/card.interface';
import ArrowKeyLogic from './ArrowKeyLogic';
const BoardSetup: React.FC = () => {
  const {
    clickedCard,
    currentPlayer,
    handBlue,
    handRed,
    hasGameFinished,
    nextCard,
    pauseGame,
    setClickedCard,
  } = useGameContext();

  const [hasPieceBeenClicked, setHasBeenPieceBeenClicked] = useState(false);

  const onCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ): void => {
    if (isActiveCard && !hasGameFinished && !pauseGame) {
      if (!isEqual(card, clickedCard)) {
        setClickedCard(card);
      }
    }
  };

  return (
    <Fragment>
      <ArrowKeyLogic
        hasPieceBeenClicked={hasPieceBeenClicked}
        setHasBeenPieceBeenClicked={setHasBeenPieceBeenClicked}
      />
      <FullWrapper playerColorToRight={currentPlayer}>
        <Card
          card={nextCard}
          isCurrentlyActive={false}
          invert={currentPlayer === 'Red'}
        />
        <BoardHandWrapper>
          <Hand
            hand={handRed}
            invert
            isCurrentlyActive={!pauseGame && currentPlayer === 'Red'}
            onCardClick={onCardClick}
          />
          <Board setPieceClicked={setHasBeenPieceBeenClicked} />
          <Hand
            hand={handBlue}
            isCurrentlyActive={!pauseGame && currentPlayer === 'Blue'}
            onCardClick={onCardClick}
          />
        </BoardHandWrapper>

        <Spacer>
          <RoundModal />
        </Spacer>
      </FullWrapper>
    </Fragment>
  );
};

export default BoardSetup;
