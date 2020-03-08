import { BLUE, RED } from '../store/engine/types/gameTypes';
import { MASTER, STUDENT } from '../store/engine/types/pieceTypes';
import { moveNotation } from './notation';

describe('tests for moveNotation', () => {
  test('it will return BoarBe5xRd5', () => {
    expect(
      moveNotation(
        BLUE,
        false,
        true,
        'Boar',
        STUDENT,
        24,
        19,
        STUDENT,
        false
      ).join('')
    ).toEqual('BoarBe5xRd5');
  });

  test('it will return OxRMa3xBMc3++', () => {
    expect(
      moveNotation(RED, false, true, 'Ox', MASTER, 2, 12, MASTER, false).join(
        ''
      )
    ).toEqual('OxRMa3xBMc3++');
  });
  test('it will return HorseBe1 d1', () => {
    expect(
      moveNotation(BLUE, false, false, 'Horse', STUDENT, 20, 15).join('')
    ).toEqual('HorseBe1 d1');
  });
  test('it will return Cobra RP pt', () => {
    expect(moveNotation(RED, true, false, 'Cobra').join('')).toEqual(
      'CobraRP pt '
    );
  });
});
