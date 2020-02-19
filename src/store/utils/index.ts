import * as GameTypes from '../engine/game/types';
import * as CardTypes from '../engine/card/types';
import sampleSize from 'lodash.samplesize';

export const setPlayersByGameType = (
  gameType: GameTypes.GameType,
  selectedPlayer?: GameTypes.PlayerType
): GameTypes.PlayerType[] => {
  switch (gameType) {
    case GameTypes.SINGLE_PLAYER:
      return selectedPlayer ? [GameTypes.PLAYER_AI, selectedPlayer] : [];
    case GameTypes.LOCAL_MULTIPLAYER:
    case GameTypes.ONLINE_MULTIPLAYER:
      return [GameTypes.PLAYER_BLUE, GameTypes.PLAYER_RED];
    default:
      return [];
  }
};

export const generateRandomCards = (
  numberOfCards = 5
): CardTypes.CardName[] => {
  const cards: CardTypes.CardName[] = [
    'Boar',
    'Cobra',
    'Crab',
    'Crane',
    'Dragon',
    'Eel',
    'Elephant',
    'Frog',
    'Goose',
    'Horse',
    'Mantis',
    'Monkey',
    'Ox',
    'Rabbit',
    'Rooster',
    'Tiger',
  ];

  return sampleSize(cards, numberOfCards);
};

export const getCards = (
  cards: CardTypes.CardName[],
  cardFor: CardTypes.CardsRequestTypes
): CardTypes.CardName[] => {
  switch (cardFor) {
    case CardTypes.HAND_BLUE:
      return [cards[0], cards[1]];
    case CardTypes.HAND_RED:
      return [cards[2], cards[3]];
    case CardTypes.NEXT_CARD:
      return [cards[4]];
    default:
      return cards;
  }
};

export const cardSwapper = (
  cardNames: CardTypes.CardName[],
  selectedCard: CardTypes.CardName | undefined
): CardTypes.CardName[] => {
  if (selectedCard) {
    const cards = cardNames.slice();
    const indexOfSelectedCard = cards.indexOf(selectedCard);
    const indexOfSwappableCard = cards.length - 1;
    const cardToSwap = cards[indexOfSwappableCard];
    cards[indexOfSelectedCard] = cardToSwap;
    cards[indexOfSwappableCard] = selectedCard;
    return cards;
  }

  return cardNames;
};
