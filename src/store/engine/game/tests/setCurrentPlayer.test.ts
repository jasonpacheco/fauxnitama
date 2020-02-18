import * as types from '../types';
import { gameReducer } from '../reducers';

describe('tests for SET_CURRENT_PLAYER', () => {
  const initialState: types.GameState = {
    currentPlayer: undefined,
    endMethod: undefined,
    gameType: undefined,
    halfmoves: 0,
    history: [],
    isGameComplete: false,
    pauseGame: false,
    players: [],
    winner: undefined,
  };

  const gameTypeStates = {
    single: gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.SINGLE_PLAYER,
    }),
    local: gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.LOCAL_MULTIPLAYER,
    }),
    online: gameReducer(initialState, {
      type: types.SET_GAME_TYPE,
      gameType: types.ONLINE_MULTIPLAYER,
    }),
  };

  const setPlayerStates = {
    userBlue: {
      single: gameReducer(gameTypeStates.single, {
        type: types.SET_PLAYERS,
        player: types.PLAYER_BLUE,
      }),
    },
    userRed: {
      single: gameReducer(gameTypeStates.single, {
        type: types.SET_PLAYERS,
        player: types.PLAYER_RED,
      }),
    },
    userNone: {
      local: gameReducer(gameTypeStates.local, {
        type: types.SET_PLAYERS,
      }),
      online: gameReducer(gameTypeStates.online, {
        type: types.SET_PLAYERS,
      }),
    },
  };

  const applyFirstPlayer = {
    blueFirst: {
      userBlue: {
        single: gameReducer(setPlayerStates.userBlue.single, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_BLUE,
        }),
      },
      userRed: {
        single: gameReducer(setPlayerStates.userRed.single, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_BLUE,
        }),
      },
      userNone: {
        local: gameReducer(setPlayerStates.userNone.local, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_BLUE,
        }),
        online: gameReducer(setPlayerStates.userNone.online, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_BLUE,
        }),
      },
    },
    redFirst: {
      userBlue: {
        single: gameReducer(setPlayerStates.userBlue.single, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_RED,
        }),
      },
      userRed: {
        single: gameReducer(setPlayerStates.userRed.single, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_RED,
        }),
      },
      userNone: {
        local: gameReducer(setPlayerStates.userNone.local, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_RED,
        }),
        online: gameReducer(setPlayerStates.userNone.online, {
          type: types.SET_CURRENT_PLAYER,
          firstPlayer: types.PLAYER_RED,
        }),
      },
    },
  };

  describe('tests for single player', () => {
    test('1a. it sets the blue as the first player when user chooses to be blue, and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userBlue.single).toEqual({
        ...applyFirstPlayer.blueFirst.userBlue.single,
        currentPlayer: types.PLAYER_BLUE,
      });
    });

    test('1b. it sets the AI as the next player on the next call', () => {
      const nextState = gameReducer(
        applyFirstPlayer.blueFirst.userBlue.single,
        {
          type: types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_AI,
      });
    });

    test('1c. it sets the AI as the first player when user chooses to be blue, and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userBlue.single).toEqual({
        ...applyFirstPlayer.redFirst.userBlue.single,
        currentPlayer: types.PLAYER_AI,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = gameReducer(applyFirstPlayer.redFirst.userBlue.single, {
        type: types.SET_CURRENT_PLAYER,
      });
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_BLUE,
      });
    });

    test('2a. it sets the red as the first player when user chooses to be red, and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userRed.single).toEqual({
        ...applyFirstPlayer.redFirst.userRed.single,
        currentPlayer: types.PLAYER_RED,
      });
    });

    test('2b. it sets the AI as the next player on the next call', () => {
      const nextState = gameReducer(applyFirstPlayer.redFirst.userRed.single, {
        type: types.SET_CURRENT_PLAYER,
      });
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_AI,
      });
    });

    test('2c. it sets the AI as the first player when user chooses to be red, and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userRed.single).toEqual({
        ...applyFirstPlayer.blueFirst.userRed.single,
        currentPlayer: types.PLAYER_AI,
      });
    });

    test('2d. it sets red as the next player on the next call', () => {
      const nextState = gameReducer(applyFirstPlayer.blueFirst.userRed.single, {
        type: types.SET_CURRENT_PLAYER,
      });
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_RED,
      });
    });
  });

  describe('tests for local multiplayer', () => {
    test('1a. it sets the blue as the first player and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userNone.local).toEqual({
        ...applyFirstPlayer.blueFirst.userNone.local,
        currentPlayer: types.PLAYER_BLUE,
      });
    });

    test('1b. it sets red as the next player on the next call', () => {
      const nextState = gameReducer(applyFirstPlayer.blueFirst.userNone.local, {
        type: types.SET_CURRENT_PLAYER,
      });
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_RED,
      });
    });

    test('1c. it sets the red as the first player and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userNone.local).toEqual({
        ...applyFirstPlayer.redFirst.userNone.local,
        currentPlayer: types.PLAYER_RED,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = gameReducer(applyFirstPlayer.redFirst.userNone.local, {
        type: types.SET_CURRENT_PLAYER,
      });
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_BLUE,
      });
    });
  });

  describe('tests for online multiplayer', () => {
    test('1a. it sets the blue as the first player and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userNone.online).toEqual({
        ...applyFirstPlayer.blueFirst.userNone.online,
        currentPlayer: types.PLAYER_BLUE,
      });
    });

    test('1b. it sets red as the next player on the next call', () => {
      const nextState = gameReducer(
        applyFirstPlayer.blueFirst.userNone.online,
        {
          type: types.SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_RED,
      });
    });

    test('1c. it sets the red as the first player and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userNone.online).toEqual({
        ...applyFirstPlayer.redFirst.userNone.online,
        currentPlayer: types.PLAYER_RED,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = gameReducer(applyFirstPlayer.redFirst.userNone.online, {
        type: types.SET_CURRENT_PLAYER,
      });
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: types.PLAYER_BLUE,
      });
    });
  });
});
