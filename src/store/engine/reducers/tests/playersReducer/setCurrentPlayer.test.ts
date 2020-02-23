import { playerReducer } from '../../../reducers/gameReducers';
import {
  PlayerState,
  SET_GAME_TYPE,
  SINGLE_PLAYER,
  LOCAL_MULTIPLAYER,
  ONLINE_MULTIPLAYER,
  SET_PLAYERS,
  PLAYER_BLUE,
  PLAYER_RED,
  PLAYER_AI,
} from '../../../types/gameTypes';
import { SET_CURRENT_PLAYER } from '../../../../../types';

describe('tests for SET_CURRENT_PLAYER', () => {
  const initialState: PlayerState = {
    currentPlayer: '',
    gameType: '',
    players: [],
  };

  const gameTypeStates = {
    single: playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: SINGLE_PLAYER,
    }),
    local: playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: LOCAL_MULTIPLAYER,
    }),
    online: playerReducer(initialState, {
      type: SET_GAME_TYPE,
      gameType: ONLINE_MULTIPLAYER,
    }),
  };

  const setPlayerStates = {
    userBlue: {
      single: playerReducer(gameTypeStates.single, {
        type: SET_PLAYERS,
        player: PLAYER_BLUE,
      }),
    },
    userRed: {
      single: playerReducer(gameTypeStates.single, {
        type: SET_PLAYERS,
        player: PLAYER_RED,
      }),
    },
    userNone: {
      local: playerReducer(gameTypeStates.local, {
        type: SET_PLAYERS,
      }),
      online: playerReducer(gameTypeStates.online, {
        type: SET_PLAYERS,
      }),
    },
  };

  const applyFirstPlayer = {
    blueFirst: {
      userBlue: {
        single: playerReducer(setPlayerStates.userBlue.single, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_BLUE,
        }),
      },
      userRed: {
        single: playerReducer(setPlayerStates.userRed.single, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_BLUE,
        }),
      },
      userNone: {
        local: playerReducer(setPlayerStates.userNone.local, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_BLUE,
        }),
        online: playerReducer(setPlayerStates.userNone.online, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_BLUE,
        }),
      },
    },
    redFirst: {
      userBlue: {
        single: playerReducer(setPlayerStates.userBlue.single, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_RED,
        }),
      },
      userRed: {
        single: playerReducer(setPlayerStates.userRed.single, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_RED,
        }),
      },
      userNone: {
        local: playerReducer(setPlayerStates.userNone.local, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_RED,
        }),
        online: playerReducer(setPlayerStates.userNone.online, {
          type: SET_CURRENT_PLAYER,
          firstPlayer: PLAYER_RED,
        }),
      },
    },
  };

  describe('tests for single player', () => {
    test('1a. it sets the blue as the first player when user chooses to be blue, and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userBlue.single).toEqual({
        ...applyFirstPlayer.blueFirst.userBlue.single,
        currentPlayer: PLAYER_BLUE,
      });
    });

    test('1b. it sets the AI as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userBlue.single,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_AI,
      });
    });

    test('1c. it sets the AI as the first player when user chooses to be blue, and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userBlue.single).toEqual({
        ...applyFirstPlayer.redFirst.userBlue.single,
        currentPlayer: PLAYER_AI,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userBlue.single,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_BLUE,
      });
    });

    test('2a. it sets the red as the first player when user chooses to be red, and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userRed.single).toEqual({
        ...applyFirstPlayer.redFirst.userRed.single,
        currentPlayer: PLAYER_RED,
      });
    });

    test('2b. it sets the AI as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userRed.single,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_AI,
      });
    });

    test('2c. it sets the AI as the first player when user chooses to be red, and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userRed.single).toEqual({
        ...applyFirstPlayer.blueFirst.userRed.single,
        currentPlayer: PLAYER_AI,
      });
    });

    test('2d. it sets red as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userRed.single,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_RED,
      });
    });
  });

  describe('tests for local multiplayer', () => {
    test('1a. it sets the blue as the first player and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userNone.local).toEqual({
        ...applyFirstPlayer.blueFirst.userNone.local,
        currentPlayer: PLAYER_BLUE,
      });
    });

    test('1b. it sets red as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userNone.local,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_RED,
      });
    });

    test('1c. it sets the red as the first player and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userNone.local).toEqual({
        ...applyFirstPlayer.redFirst.userNone.local,
        currentPlayer: PLAYER_RED,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userNone.local,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_BLUE,
      });
    });
  });

  describe('tests for online multiplayer', () => {
    test('1a. it sets the blue as the first player and the first player is blue', () => {
      expect(applyFirstPlayer.blueFirst.userNone.online).toEqual({
        ...applyFirstPlayer.blueFirst.userNone.online,
        currentPlayer: PLAYER_BLUE,
      });
    });

    test('1b. it sets red as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.blueFirst.userNone.online,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_RED,
      });
    });

    test('1c. it sets the red as the first player and the first player is red', () => {
      expect(applyFirstPlayer.redFirst.userNone.online).toEqual({
        ...applyFirstPlayer.redFirst.userNone.online,
        currentPlayer: PLAYER_RED,
      });
    });

    test('1d. it sets blue as the next player on the next call', () => {
      const nextState = playerReducer(
        applyFirstPlayer.redFirst.userNone.online,
        {
          type: SET_CURRENT_PLAYER,
        }
      );
      expect(nextState).toEqual({
        ...nextState,
        currentPlayer: PLAYER_BLUE,
      });
    });
  });
});
