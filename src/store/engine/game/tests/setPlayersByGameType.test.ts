import * as Types from '../types';
import { setPlayersByGameType } from '../reducers';

describe('test for setPlayersByGameType', () => {
  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    expect(
      setPlayersByGameType(Types.SINGLE_PLAYER, Types.PLAYER_BLUE)
    ).toEqual([Types.PLAYER_AI, Types.PLAYER_BLUE]);
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    expect(
      setPlayersByGameType(Types.SINGLE_PLAYER, Types.PLAYER_RED)
    ).toEqual([Types.PLAYER_AI, Types.PLAYER_RED]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    expect(setPlayersByGameType(Types.LOCAL_MULTIPLAYER)).toEqual([
      Types.PLAYER_BLUE,
      Types.PLAYER_RED,
    ]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    expect(setPlayersByGameType(Types.ONLINE_MULTIPLAYER)).toEqual([
      Types.PLAYER_BLUE,
      Types.PLAYER_RED,
    ]);
  });
});
