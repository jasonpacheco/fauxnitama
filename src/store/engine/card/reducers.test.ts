/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-nocheck

import { cardReducer } from './reducers';
import { rootReducer } from '../index';
import mockStore from '../mockStore';
import { selectCard, swapCards } from './actions';

import * as Types from './types';

describe('tests for card reducers', () => {
  const mockCards: Types.CardName[] = [
    'Rooster',
    'Eel',
    'Monkey',
    'Ox',
    'Dragon',
  ];

  describe('tests for card reducer', () => {
    const initialState = {
      cards: mockCards,
      selectedCard: undefined,
    };

    test('should select a card', () => {
      expect(
        cardReducer(initialState, {
          type: Types.SELECT_CARD,
          selectedCardName: 'Eel',
        })
      ).toEqual({
        cards: mockCards,
        selectedCard: 'Eel',
      });
    });

    test('it swaps cards successfully', () => {
      const state: Types.CardState = {
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

describe('tests for actions', () => {
  test('dispatches selectCard action', async () => {
    const mockCards: Types.CardName[] = [
      'Rooster',
      'Eel',
      'Monkey',
      'Ox',
      'Dragon',
    ];
    // Refer to: https://github.com/dmitry-zaets/redux-mock-store/issues/71#issuecomment-515209822
    const createState = initialState => actions =>
      actions.reduce(rootReducer, initialState);

    const initialState = createState({
      card: {
        cards: mockCards,
        selectedCard: undefined,
      },
    });

    const store = mockStore(initialState);

    expect(store.getState().card.cards[0]).toEqual('Rooster');
    await store.dispatch(selectCard('Eel'));
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: Types.SELECT_CARD,
      selectedCardName: 'Eel',
    });
  });
});
