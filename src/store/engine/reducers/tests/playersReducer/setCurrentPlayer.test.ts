import * as Types from '../../../types/gameTypes';
import { playerReducer } from '../../../reducers/gameReducers';

describe('tests for SET_CURRENT_PLAYER', () => {
  const initialState: Types.PlayerState = {
    currentPlayer: undefined,
    gameType: undefined,
    players: [],
  };

  const gameTypeStates = {
    single: playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.SINGLE_PLAYER,
    }),
    local: playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.LOCAL_MULTIPLAYER,
    }),
    online: playerReducer(initialState, {
      type: Types.SET_GAME_TYPE,
      gameType: Types.ONLINE_MULTIPLAYER,
    }),
  };

  const setPlayerStates = {
    userBlue: {
      single: playerReducer(gameTypeStates.single, {
        type: Types.SET_PLAYERS,
        player: Types.PLAYER_BLUE,
      }),
    },
    userRed: {
      single: playerReducer(gameTypeStates.single, {
        type: Types.SET_PLAYERS,
        player: Types.PLAYER_RED,
      }),
    },
    userNone: {
      local: playerReducer(gameTypeStates.local, {
        type: Types.SET_PLAYERS,
      }),
      online: playerReducer(gameTypeStates.online, {
        type: Types.SET_PLAYERS,
      }),
    },
  };

  const applyFirstPlayer = {
    blueFirst: {
      userBlue: {
        single: playerReducer(setPlayerStates.userBlue.single, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_BLUE,
        }),
      },
      userRed: {
        single: playerReducer(setPlayerStates.userRed.single, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_BLUE,
        }),
      },
      userNone: {
        local: playerReducer(setPlayerStates.userNone.local, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_BLUE,
        }),
        online: playerReducer(setPlayerStates.userNone.online, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_BLUE,
        }),
      },
    },
    redFirst: {
      userBlue: {
        single: playerReducer(setPlayerStates.userBlue.single, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_RED,
        }),
      },
      userRed: {
        single: playerReducer(setPlayerStates.userRed.single, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_RED,
        }),
      },
      userNone: {
        local: playerReducer(setPlayerStates.userNone.local, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_RED,
        }),
        online: playerReducer(setPlayerStates.userNone.online, {
          type: Types.SET_CURRENT_PLAYER,
          firstPlayer: Types.PLAYER_RED,
        }),
      },
    },
  };

  describe('tests for single player', () => {
    test('1a. it sets the blue as the first player when user chooses to be blue, and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userBlue.single).toEqual({
        ...applyFirstPlayer.blueFirst.userBlue.single,
        currentPlayer: Types.PLAYER_BLUE,
      });
    });

    test('1b. it sets the AI as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userBlue.single,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_AI,
      });
    });

    test('1c. it sets the AI as the first player when user chooses to be blue, and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userBlue.single).toEqual({
        ...applyFirstPlayer.redFirst.userBlue.single,
        currentPlayer: Types.PLAYER_AI,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userBlue.single,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_BLUE,
      });
    });

    test('2a. it sets the red as the first player when user chooses to be red, and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userRed.single).toEqual({
        ...applyFirstPlayer.redFirst.userRed.single,
        currentPlayer: Types.PLAYER_RED,
      });
    });

    test('2b. it sets the AI as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userRed.single,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_AI,
      });
    });

    test('2c. it sets the AI as the first player when user chooses to be red, and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userRed.single).toEqual({
        ...applyFirstPlayer.blueFirst.userRed.single,
        currentPlayer: Types.PLAYER_AI,
      });
    });

    test('2d. it sets red as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userRed.single,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_RED,
      });
    });
  });

  describe('tests for local multiplayer', () => {
    test('1a. it sets the blue as the first player and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userNone.local).toEqual({
        ...applyFirstPlayer.blueFirst.userNone.local,
        currentPlayer: Types.PLAYER_BLUE,
      });
    });

    test('1b. it sets red as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userNone.local,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_RED,
      });
    });

    test('1c. it sets the red as the first player and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userNone.local).toEqual({
        ...applyFirstPlayer.redFirst.userNone.local,
        currentPlayer: Types.PLAYER_RED,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userNone.local,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_BLUE,
      });
    });
  });

  describe('tests for online multiplayer', () => {
    test('1a. it sets the blue as the first player and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userNone.online).toEqual({
        ...applyFirstPlayer.blueFirst.userNone.online,
        currentPlayer: Types.PLAYER_BLUE,
      });
    });

    test('1b. it sets red as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userNone.online,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_RED,
      });
    });

    test('1c. it sets the red as the first player and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userNone.online).toEqual({
        ...applyFirstPlayer.redFirst.userNone.online,
        currentPlayer: Types.PLAYER_RED,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userNone.online,
        {
          type: Types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: Types.PLAYER_BLUE,
      });
    });
  });
});
