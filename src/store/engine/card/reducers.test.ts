import {
  generateRandomCards,
  getCards,
  cardSwapper,
  cardReducer,
} from './reducers';

import { selectCard, swapCards } from './actions';

import { CardName, HAND_BLUE, HAND_RED, NEXT_CARD, CardState } from './types';

describe('tests for card reducers', () => {
  const mockCards: CardName[] = ['Rooster', 'Eel', 'Monkey', 'Ox', 'Dragon'];

  test('it generates 5 random cards', () => {
    expect(generateRandomCards()).toHaveLength(5);
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

  describe('tests for card reducer', () => {
    const initialState = {
      cards: mockCards,
      selectedCard: undefined,
    };

    test('should select a card', () => {
      expect(cardReducer(initialState, selectCard('Eel'))).toEqual({
        cards: mockCards,
        selectedCard: 'Eel',
      });
    });

    test('it swaps cards successfully', () => {
      const state: CardState = {
        cards: mockCards,
        selectedCard: 'Eel',
      };
      expect(cardReducer(state, swapCards())).toEqual({
        cards: ['Rooster', 'Dragon', 'Monkey', 'Ox', 'Eel'],
        selectedCard: undefined,
      });
    });
  });
});
