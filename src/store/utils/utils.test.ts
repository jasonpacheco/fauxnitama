import * as GameTypes from '../engine/game/types';
import * as CardTypes from '../engine/card/types';
import {
  cardSwapper,
  generateRandomCards,
  getCards,
  setPlayersByGameType,
} from '.';

describe('test for setPlayersByGameType', () => {
  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    expect(
      setPlayersByGameType(GameTypes.SINGLE_PLAYER, GameTypes.PLAYER_BLUE)
    ).toEqual([GameTypes.PLAYER_AI, GameTypes.PLAYER_BLUE]);
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    expect(
      setPlayersByGameType(GameTypes.SINGLE_PLAYER, GameTypes.PLAYER_RED)
    ).toEqual([GameTypes.PLAYER_AI, GameTypes.PLAYER_RED]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    expect(setPlayersByGameType(GameTypes.LOCAL_MULTIPLAYER)).toEqual([
      GameTypes.PLAYER_BLUE,
      GameTypes.PLAYER_RED,
    ]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    expect(setPlayersByGameType(GameTypes.ONLINE_MULTIPLAYER)).toEqual([
      GameTypes.PLAYER_BLUE,
      GameTypes.PLAYER_RED,
    ]);
  });
});

describe('tests for card utils', () => {
  const mockCards: CardTypes.CardName[] = [
    'Rooster',
    'Eel',
    'Monkey',
    'Ox',
    'Dragon',
  ];

  describe('test for generate random cards', () => {
    test('it generates 5 random cards', () => {
      expect(generateRandomCards()).toHaveLength(5);
    });
  });

  describe('tests for getCards', () => {
    test('gets appropriate cards for HAND_BLUE', () => {
      expect(getCards(mockCards, CardTypes.HAND_BLUE)).toEqual([
        'Rooster',
        'Eel',
      ]);
    });

    test('gets appropriate cards for HAND_RED', () => {
      expect(getCards(mockCards, CardTypes.HAND_RED)).toEqual(['Monkey', 'Ox']);
    });

    test('gets appropriate card for NEXT_CARD', () => {
      expect(getCards(mockCards, CardTypes.NEXT_CARD)).toEqual(['Dragon']);
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
});
