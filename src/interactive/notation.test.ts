import { moveNotation } from './notation';

describe('tests for moveNotation', () => {
  test('it will return BoarBe5xRd5', () => {
    expect(
      moveNotation(
        'Blue',
        false,
        true,
        'Boar',
        'Student',
        24,
        19,
        { currentPositionID: 19, type: 'Student', color: 'Red' },
        false
      ).join('')
    ).toEqual('BoarBe5xRd5');
  });

  test('it will return OxRMa3xBMc3++', () => {
    expect(
      moveNotation(
        'Red',
        false,
        true,
        'Ox',
        'Master',
        2,
        12,
        { currentPositionID: 12, type: 'Master', color: 'Blue' },
        false
      ).join('')
    ).toEqual('OxRMa3xBMc3++');
  });
  test('it will return HorseBe1 d1', () => {
    expect(
      moveNotation('Blue', false, false, 'Horse', 'Student', 20, 15).join('')
    ).toEqual('HorseBe1 d1');
  });
  test('it will return Cobra RP pt', () => {
    expect(moveNotation('Red', true, false, 'Cobra').join('')).toEqual(
      'CobraRP pt '
    );
  });
});
