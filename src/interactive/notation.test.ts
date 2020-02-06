import { moveNotation } from './notation';

describe('tests for moveNotation', () => {
  test('it will return BS[24,19]xRS(Boar)', () => {
    expect(
      moveNotation(
        'Blue',
        false,
        true,
        'Boar',
        { currentPositionID: 24, type: 'Student', color: 'Blue' },
        24,
        19,
        { currentPositionID: 19, type: 'Student', color: 'Red' },
        false
      ).join('')
    ).toEqual('BS[24,19]xRS(Boar)');
  });

  test('it will return RM[2,12]xBM(Ox)', () => {
    expect(
      moveNotation(
        'Red',
        false,
        true,
        'Ox',
        { currentPositionID: 2, type: 'Master', color: 'Red' },
        2,
        12,
        { currentPositionID: 12, type: 'Master', color: 'Blue' },
        false
      ).join('')
    ).toEqual('RM[2,12]xBM(Ox)');
  });
  test('it will return BS[20,15](Horse)', () => {
    expect(
      moveNotation(
        'Blue',
        false,
        false,
        'Horse',
        { currentPositionID: 20, type: 'Student', color: 'Blue' },
        20,
        15
      ).join('')
    ).toEqual('BS[20,15](Horse)');
  });
  test('it will return RPpt(Cobra)', () => {
    expect(moveNotation('Red', true, false, 'Cobra').join('')).toEqual(
      'RPpt(Cobra)'
    );
  });
});
