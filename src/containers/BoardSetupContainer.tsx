import React, { Fragment, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Board from '../components/Board/Board';
import Hand from '../components/BoardSetup/Hand';
import {
  BoardHandWrapper,
  FullWrapper,
  Spacer,
} from '../components/BoardSetup/styles/BoardSetup';
import Card from '../components/Card/Card';
import { aiRandomMove } from '../store/ai/actions';
import { AppState } from '../store/engine';
import { onClickCard } from '../store/engine/actions/cardActions';
import {
  onClickSquare,
  onGameInitialization,
} from '../store/engine/actions/eventActions';
import {
  CardName,
  HAND_BLUE,
  HAND_RED,
  NEXT_CARD,
} from '../store/engine/types/cardTypes';
import { BLUE, PLAYER_AI, PlayerType } from '../store/engine/types/gameTypes';
import { getCards } from '../store/utils';
import KeyLogic from './KeyLogicContainer';
import RoundModal from './RoundModalContainer';

interface StateProps {
  currentPlayer: PlayerType;
  handP1: CardName[];
  handP2: CardName[];
  isGameComplete: boolean;
  nextCard: CardName;
  pauseGame: boolean;
  players: PlayerType[];
  selectedCardName: CardName | '';
}

type BoardSetupContainerProps = PropsFromRedux;

const BoardSetupContainer: React.FC<BoardSetupContainerProps> = ({
  aiRandomMove,
  currentPlayer,
  handP1,
  handP2,
  isGameComplete,
  nextCard,
  onClickCard,
  onClickSquare,
  onGameInitialization,
  pauseGame,
  players,
  selectedCardName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onGameInitialization();
    setIsLoading(false);
  }, []);

  React.useMemo(() => {
    if (currentPlayer === PLAYER_AI) {
      aiRandomMove();
    }
  }, [currentPlayer, isGameComplete]);

  const handleClickCard = (cardName: CardName): void => {
    onClickCard(cardName);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Fragment>
      {currentPlayer !== PLAYER_AI && <KeyLogic />}
      <FullWrapper playerColorToRight={currentPlayer} players={players}>
        <Card
          name={nextCard}
          isCurrentlyActive={false}
          invert={currentPlayer === players[0]}
        />
        <BoardHandWrapper>
          <Hand
            hand={handP1}
            invert
            isCurrentlyActive={!pauseGame && currentPlayer === players[0]}
            handleClickCard={handleClickCard}
            selectedCardName={selectedCardName}
          />
          <Board onClickSquare={onClickSquare} />
          <Hand
            hand={handP2}
            isCurrentlyActive={!pauseGame && currentPlayer === players[1]}
            handleClickCard={handleClickCard}
            selectedCardName={selectedCardName}
          />
        </BoardHandWrapper>

        <Spacer>
          <RoundModal />
        </Spacer>
      </FullWrapper>
    </Fragment>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  const { cards, selectedCardName } = state.cardReducer;
  const { currentPlayer, players, colors } = state.gameReducer.player;
  const { pauseGame, isGameComplete } = state.gameReducer.properties;
  const handP1 = (colors[0] === BLUE
    ? getCards(cards, HAND_BLUE)
    : getCards(cards, HAND_RED)) as CardName[];

  const handP2 = (colors[0] === BLUE
    ? getCards(cards, HAND_RED)
    : getCards(cards, HAND_BLUE)) as CardName[];
  return {
    currentPlayer: currentPlayer as PlayerType,
    handP1,
    handP2,
    isGameComplete,
    nextCard: getCards(cards, NEXT_CARD) as CardName,
    pauseGame,
    players,
    selectedCardName,
  };
};

const connector = connect(mapStateToProps, {
  aiRandomMove,
  onClickCard,
  onClickSquare,
  onGameInitialization,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BoardSetupContainer);
