import sampleSize from 'lodash.samplesize';
import {
  GameType,
  SINGLE_PLAYER,
  PLAYER_AI,
  LOCAL_MULTIPLAYER,
  ONLINE_MULTIPLAYER,
  PLAYER_BLUE,
  PLAYER_RED,
  PlayerType,
} from '../engine/types/gameTypes';
import { CardName } from '../../interfaces/card.interface';
import {
  CardsRequestTypes,
  HAND_BLUE,
  HAND_RED,
  NEXT_CARD,
} from '../engine/types/cardTypes';
import {
  PieceTuple,
  PiecePosition,
  MASTER,
  STUDENT,
} from '../engine/types/pieceTypes';

export interface PieceProperties {
  id: number;
  type: typeof MASTER | typeof STUDENT;
  color: typeof PLAYER_BLUE | typeof PLAYER_RED;
}

export const idToPiece = (
  id: number,
  piecePositions: PiecePosition,
  players: PlayerType[]
): PieceProperties | undefined => {
  const player1 = piecePositions[players[0]].find(
    pieceTuple => pieceTuple[0] === id
  );

  if (player1) {
    const color =
      players[0] === PLAYER_AI
        ? players[1] === PLAYER_BLUE
          ? PLAYER_RED
          : PLAYER_BLUE
        : (players[0] as typeof PLAYER_BLUE | typeof PLAYER_RED);
    return { id, type: player1[1], color };
  }

  const player2 = piecePositions[players[1]].find(
    pieceTuple => pieceTuple[0] === id
  );

  if (player2) {
    const color = players[1] as typeof PLAYER_BLUE | typeof PLAYER_RED;
    return { id, type: player2[1], color };
  }

  return undefined;
};

export const setPlayersByGameType = (
  gameType: GameType,
  selectedPlayer?: PlayerType
): PlayerType[] => {
  switch (gameType) {
    case SINGLE_PLAYER:
      return selectedPlayer ? [PLAYER_AI, selectedPlayer] : [];
    case LOCAL_MULTIPLAYER:
    case ONLINE_MULTIPLAYER:
      return [PLAYER_BLUE, PLAYER_RED];
    default:
      return [];
  }
};

export const generateRandomCards = (numberOfCards = 5): CardName[] => {
  const cards: CardName[] = [
    'Bear',
    'Boar',
    'Cobra',
    'Crab',
    'Crane',
    'Dog',
    'Dragon',
    'Eel',
    'Elephant',
    'Fox',
    'Frog',
    'Giraffe',
    'Goose',
    'Horse',
    'Iguana',
    'Kirin',
    'Mantis',
    'Monkey',
    'Mouse',
    'Otter',
    'Ox',
    'Panda',
    'Phoenix',
    'Rabbit',
    'Rat',
    'Rooster',
    'Sable',
    'Sea Snake',
    'Tanuki',
    'Tiger',
    'Turtle',
    'Viper',
  ];

  return sampleSize(cards, numberOfCards);
};

export const getCards = (
  cards: CardName[],
  cardFor: CardsRequestTypes
): CardName[] | CardName => {
  switch (cardFor) {
    case HAND_BLUE:
      return [cards[0], cards[1]];
    case HAND_RED:
      return [cards[2], cards[3]];
    case NEXT_CARD:
      return cards[4];
    default:
      return cards;
  }
};

export const getCardFor = (
  currentPlayer: PlayerType,
  otherPlayer: PlayerType
): CardsRequestTypes => {
  switch (currentPlayer) {
    case PLAYER_BLUE:
      return HAND_BLUE;
    case PLAYER_RED:
      return HAND_RED;
    case PLAYER_AI:
      return otherPlayer === PLAYER_BLUE ? HAND_RED : HAND_BLUE;
    default:
      return NEXT_CARD;
  }
};

export const getPlayerCards = (
  cards: CardName[],
  players: PlayerType[],
  currentPlayer: PlayerType
): CardName[] => {
  const currentPlayerIndex = players.indexOf(currentPlayer);
  const otherPlayerIndex = 1 - currentPlayerIndex;

  const cardFor = getCardFor(
    players[currentPlayerIndex],
    players[otherPlayerIndex]
  );

  return getCards(cards, cardFor) as CardName[];
};

export const cardSwapper = (
  cardNames: CardName[],
  selectedCard: CardName | undefined
): CardName[] => {
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

export const pieceBelongsToPlayer = (
  playerPiecePositions: PieceTuple[],
  pieceID: number
): boolean => playerPiecePositions.some(([id]) => id === pieceID);
