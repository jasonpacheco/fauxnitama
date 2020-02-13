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
    clearGameState,
    clickedCard,
    currentPlayer,
    handBlue,
    handRed,
    hasGameFinished,
    moveHistory,
    nextCard,
    pauseGame,
    setClickedCard,
    setPassTurn,
    setPauseGame,
    winner,
    winMethod,
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
          clickedCard={clickedCard}
          isCurrentlyActive={false}
          invert={currentPlayer === 'Red'}
          reset={hasGameFinished}
        />
        <BoardHandWrapper>
          <Hand
            clickedCard={clickedCard}
            hand={handRed}
            invert
            isCurrentlyActive={!pauseGame && currentPlayer === 'Red'}
            onCardClick={onCardClick}
            reset={hasGameFinished}
          />
          <Board setPieceClicked={setHasBeenPieceBeenClicked} />
          <Hand
            clickedCard={clickedCard}
            hand={handBlue}
            isCurrentlyActive={!pauseGame && currentPlayer === 'Blue'}
            onCardClick={onCardClick}
            reset={hasGameFinished}
          />
        </BoardHandWrapper>

        <Spacer>
          <RoundModal
            clearGameState={clearGameState}
            clickedCard={clickedCard}
            hasGameFinished={hasGameFinished}
            moveHistory={moveHistory}
            pauseGame={pauseGame}
            setPassTurn={setPassTurn}
            setPauseGame={setPauseGame}
            winMethod={winMethod}
            winner={winner}
          />
        </Spacer>
      </FullWrapper>
    </Fragment>
  );
};

export default BoardSetup;
