import { getFEN } from './getFEN';
import {
  MockBoard,
  MockBoard2,
  MockBoard3,
  mockHandBlue,
  mockHandRed,
  mockNextCard,
} from './mockData';

describe('tests for getFEN', () => {
  test('for initial board, returns ssmss/5/5/5/SSMSS/ox-co/BO-RO/go', () => {
    expect(
      getFEN(MockBoard, mockHandRed, mockHandBlue, mockNextCard, 'Blue')
    ).toEqual('ssmss/5/5/5/SSMSS/ox-co/BO-RO/go');
  });

  test('for board 2, returns s1mss/5/4s/5/SSMSS/ox-co/BO-RO/GO', () => {
    expect(
      getFEN(MockBoard2, mockHandRed, mockHandBlue, mockNextCard, 'Red')
    ).toEqual('s1mss/5/4s/5/SSMSS/ox-co/BO-RO/GO');
  });

  test('for board 3, returns S2s1/s2S1/3Ms/3m1/1SsS1/ox-co/BO-RO/go', () => {
    expect(
      getFEN(MockBoard3, mockHandRed, mockHandBlue, mockNextCard, 'Blue')
    ).toEqual('S2s1/s2S1/3Ms/3m1/1SsS1/ox-co/BO-RO/go');
  });
});