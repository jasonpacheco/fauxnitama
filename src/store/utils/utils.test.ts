import {
  cardSwapper,
  generateRandomCards,
  getCards,
  setPlayersByGameType,
  getCardFor,
  getPlayerCards,
} from '.';
import {
  SINGLE_PLAYER,
  PLAYER_BLUE,
  PLAYER_AI,
  PLAYER_RED,
  LOCAL_MULTIPLAYER,
  ONLINE_MULTIPLAYER,
  PlayerType,
} from '../engine/types/gameTypes';

import {
  HAND_BLUE,
  HAND_RED,
  NEXT_CARD,
  CardName,
} from '../engine/types/cardTypes';

describe('test for setPlayersByGameType', () => {
  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    expect(setPlayersByGameType(SINGLE_PLAYER, PLAYER_BLUE)).toEqual([
      PLAYER_AI,
      PLAYER_BLUE,
    ]);
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    expect(setPlayersByGameType(SINGLE_PLAYER, PLAYER_RED)).toEqual([
      PLAYER_AI,
      PLAYER_RED,
    ]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    expect(setPlayersByGameType(LOCAL_MULTIPLAYER)).toEqual([
      PLAYER_BLUE,
      PLAYER_RED,
    ]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    expect(setPlayersByGameType(ONLINE_MULTIPLAYER)).toEqual([
      PLAYER_BLUE,
      PLAYER_RED,
    ]);
  });
});

describe('tests for card utils', () => {
  const mockCards: CardName[] = ['Rooster', 'Eel', 'Monkey', 'Ox', 'Dragon'];

  describe('test for generate random cards', () => {
    test('it generates 5 random cards', () => {
      expect(generateRandomCards()).toHaveLength(5);
    });
  });

  describe('tests for getCards', () => {
    test('gets appropriate cards for HAND_BLUE', () => {
      expect(getCards(mockCards, HAND_BLUE)).toEqual(['Rooster', 'Eel']);
    });

    test('gets appropriate cards for HAND_RED', () => {
      expect(getCards(mockCards, HAND_RED)).toEqual(['Monkey', 'Ox']);
    });

    test('gets appropriate card for NEXT_CARD', () => {
      expect(getCards(mockCards, NEXT_CARD)).toEqual(['Dragon']);
    });
  });

  describe('tests for cardSwapper', () => {
    const mockSelectedCard = 'Eel';

    test('it can swap cards successfully', () => {
      expect(cardSwapper(mockCards, mockSelectedCard)).toEqual([
        'Rooster',
        'Dragon',
        'Monkey',
        'Ox',
        'Eel',
      ]);

      expect(cardSwapper(mockCards, 'Rooster')).toEqual([
        'Dragon',
        'Eel',
        'Monkey',
        'Ox',
        'Rooster',
      ]);

      expect(cardSwapper(mockCards, undefined)).toEqual([
        'Rooster',
        'Eel',
        'Monkey',
        'Ox',
        'Dragon',
      ]);
    });
  });

  describe('tests for getPlayerCards', () => {
    const cards: CardName[] = ['Boar', 'Cobra', 'Monkey', 'Ox', 'Tiger'];
    const players: PlayerType[] = [PLAYER_AI, PLAYER_RED];
    const currentPlayer = PLAYER_RED;
    describe('tests for getCardForHelper', () => {
      test('it returns HAND_RED for current player = PLAYER_RED', () => {
        expect(getCardFor(PLAYER_RED, PLAYER_AI)).toEqual(HAND_RED);
      });
      test('it returns HAND_BLUE for current player = PLAYER_AI', () => {
        expect(getCardFor(PLAYER_AI, PLAYER_RED)).toEqual(HAND_BLUE);
      });
      test('it returns HAND_BLUE for current player = PLAYER_BLUE', () => {
        expect(getCardFor(PLAYER_BLUE, PLAYER_RED)).toEqual(HAND_BLUE);
      });
      test('it returns HAND_BLUE for current player = PLAYER_BLUE', () => {
        expect(getCardFor(PLAYER_BLUE, PLAYER_AI)).toEqual(HAND_BLUE);
      });
      test('it returns HAND_RED for current player = PLAYER_AI', () => {
        expect(getCardFor(PLAYER_AI, PLAYER_BLUE)).toEqual(HAND_RED);
      });
      test('it returns HAND_RED for current player = PLAYER_RED', () => {
        expect(getCardFor(PLAYER_RED, PLAYER_BLUE)).toEqual(HAND_RED);
      });
    });

    describe('tests for method', () => {
      test('it returns [Monkey, Ox]', () => {
        expect(getPlayerCards(cards, players, currentPlayer)).toEqual([
          'Monkey',
          'Ox',
        ]);
      });

      test('it returns [Boar, Cobra]', () => {
        expect(getPlayerCards(cards, players, PLAYER_AI)).toEqual([
          'Boar',
          'Cobra',
        ]);
      });
    });
  });
});
