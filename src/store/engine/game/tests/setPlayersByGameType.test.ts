import * as types from '../types';
import { setPlayersByGameType } from '../reducers';

describe('test for setPlayersByGameType', () => {
  test('it returns [PLAYER_AI, PLAYER_BLUE] for single player', () => {
    expect(
      setPlayersByGameType(types.SINGLE_PLAYER, types.PLAYER_BLUE)
    ).toEqual([types.PLAYER_AI, types.PLAYER_BLUE]);
  });

  test('it returns [PLAYER_AI, PLAYER_RED] for single player', () => {
    expect(
      setPlayersByGameType(types.SINGLE_PLAYER, types.PLAYER_RED)
    ).toEqual([types.PLAYER_AI, types.PLAYER_RED]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for local multiplayer', () => {
    expect(setPlayersByGameType(types.LOCAL_MULTIPLAYER)).toEqual([
      types.PLAYER_BLUE,
      types.PLAYER_RED,
    ]);
  });

  test('it returns [PLAYER_BLUE, PLAYER_RED] for online multiplayer', () => {
    expect(setPlayersByGameType(types.ONLINE_MULTIPLAYER)).toEqual([
      types.PLAYER_BLUE,
      types.PLAYER_RED,
    ]);
  });
});
