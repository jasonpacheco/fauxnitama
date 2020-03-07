import React, { Fragment, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  NEXT_CARD,
  HAND_RED,
  HAND_BLUE,
} from '../store/engine/types/cardTypes';
import { AppState } from '../store/engine';
import { CardName } from '../store/engine/types/cardTypes';

import {
  onGameInitialization,
  onClickCard,
  onClickSquare,
} from '../store/engine/actions/eventActions';
import { getCards } from '../store/utils';
import {
  FullWrapper,
  BoardHandWrapper,
  Spacer,
} from '../components/BoardSetup/styles/BoardSetup';
import Card from '../components/Card/CardNew';
import Hand from '../components/BoardSetup/HandNew';
import Board from '../components/Board/BoardNew';
import KeyLogic from './KeyLogicContainer';
import RoundModal from '../containers/RoundModalContainer';
import { PlayerType, BLUE, PLAYER_AI } from '../store/engine/types/gameTypes';
import { aiRandomMove } from '../store/ai/actions';

interface StateProps {
  handP1: CardName[];
  handP2: CardName[];
  nextCard: CardName;
  currentPlayer: PlayerType;
  players: PlayerType[];
  pauseGame: boolean;
  selectedCardName: CardName | '';
  isGameComplete: boolean;
}

type BoardSetupContainerProps = PropsFromRedux;

const BoardSetupContainer: React.FC<BoardSetupContainerProps> = ({
  handP1,
  handP2,
  nextCard,
  currentPlayer,
  players,
  onGameInitialization,
  onClickCard,
  pauseGame,
  onClickSquare,
  selectedCardName,
  aiRandomMove,
  isGameComplete,
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
    handP1,
    handP2,
    nextCard: getCards(cards, NEXT_CARD) as CardName,
    currentPlayer: currentPlayer as PlayerType,
    players,
    pauseGame,
    selectedCardName,
    isGameComplete,
  };
};

const connector = connect(mapStateToProps, {
  onGameInitialization,
  onClickCard,
  onClickSquare,
  aiRandomMove,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BoardSetupContainer);
