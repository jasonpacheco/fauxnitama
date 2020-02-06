import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';

import {
  CLEAR_GAME_STATE,
  MOVE_PIECE,
  SET_CLICKED_CARD,
  SET_CLICKED_PIECE,
  SET_CURRENT_PLAYER,
  SET_HAS_GAME_FINISHED,
  SET_IS_CLEARED,
  SET_NEXT_CARD,
  SET_PAUSE,
  SET_VALID_MOVES,
  SET_WIN_METHOD,
  SET_WINNER,
} from '../types';

import CardModel from '../interfaces/card.interface';
import {
  Piece,
  PlayerColor,
  State,
  WinMethods,
} from '../interfaces/context.interface';
import { Opponent, Player } from '../state/playerState';

import {
  checkMaster,
  checkTemple,
  generateCardSet,
  generateEmptyCells,
} from '../utils';
import cloneDeep from 'lodash.clonedeep';

const cards: CardModel[] = generateCardSet();

const initialState: State = {
  board: cloneDeep([...Opponent, ...generateEmptyCells(), ...Player]),
  clickedCard: undefined,
  clickedPiece: undefined,
  currentPlayer: cards[4].stamp,
  handBlue: { first: cards[2], second: cards[3] },
  handRed: { first: cards[0], second: cards[1] },
  hasGameFinished: false,
  isCleared: false,
  nextCard: cards[4],
  pauseGame: false,
  validMoves: [],
  winMethod: undefined,
  winner: undefined,
};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setValidMoves = (piece: Piece | undefined): void => {
    dispatch({
      type: SET_VALID_MOVES,
      piece,
    });
  };

  const setClickedPiece = (clickedPiece: Piece): void => {
    dispatch({
      type: SET_CLICKED_PIECE,
      clickedPiece,
    });
    /** Implements move checking when cell is clicked */
    if (state.clickedCard) {
      setValidMoves(clickedPiece);
    }
  };

  const setIsCleared = (): void => {
    dispatch({
      type: SET_IS_CLEARED,
    });
  };

  const setClickedCard = (clickedCard: CardModel): void => {
    dispatch({
      type: SET_CLICKED_CARD,
      clickedCard,
    });

    /** Implements automatic move checking when the user selects another card */
    if (state.clickedPiece) {
      setValidMoves(state.clickedPiece);
    }
  };

  const setNextCard = (
    nextCard: CardModel,
    targetProperty: 'handBlue' | 'handRed',
    replacementCard: CardModel
  ): void => {
    dispatch({
      type: SET_NEXT_CARD,
      nextCard,
      targetProperty,
      replacementCard,
    });
  };

  const setCurrentPlayer = (player: PlayerColor): void => {
    dispatch({
      type: SET_CURRENT_PLAYER,
      player,
    });
  };

  const setHasGameFinished = (): void => {
    dispatch({
      type: SET_HAS_GAME_FINISHED,
    });
  };

  const setWinner = (winner: PlayerColor): void => {
    dispatch({
      type: SET_WINNER,
      winner,
    });
  };

  const setWinMethod = (winMethod: WinMethods): void => {
    dispatch({
      type: SET_WIN_METHOD,
      winMethod,
    });
  };

  const movePiece = (fromPiece: Piece, toID: number): void => {
    const from = cloneDeep(fromPiece);
    const fromPlayer = from.color;
    const fromPlayerType = from.type;
    const isMoveCheckmate = checkMaster(toID, state.board);
    const isMoveTempleCapture = checkTemple(fromPlayer, fromPlayerType, toID);
    const nextPlayer = fromPlayer === 'Blue' ? 'Red' : 'Blue';
    if (fromPlayer && isMoveCheckmate) {
      console.log('Opponent master has been captured!');
      setWinner(fromPlayer);
      setWinMethod('master-check');
      setHasGameFinished();
    } else if (fromPlayer && isMoveTempleCapture) {
      console.log('Opponent temple has been captured!');
      setWinner(fromPlayer);
      setWinMethod('temple-check');
      setHasGameFinished();
    }
    dispatch({
      type: MOVE_PIECE,
      fromPiece: from,
      toID,
    });

    if (state.clickedCard) {
      const poppedNextCard = state.nextCard;
      const targetProperty = fromPlayer === 'Blue' ? 'handBlue' : 'handRed';
      setNextCard(state.clickedCard, targetProperty, poppedNextCard);
    }
    setValidMoves(undefined);
    setCurrentPlayer(nextPlayer);
  };

  const clearGameState = (): void => {
    setIsCleared();
    setHasGameFinished();
    dispatch({
      type: CLEAR_GAME_STATE,
    });
  };

  const setPassTurn = (): void => {
    const replacementCard = state.nextCard;
    const targetProperty =
      state.currentPlayer === 'Blue' ? 'handBlue' : 'handRed';

    if (state.clickedCard) {
      setNextCard(state.clickedCard, targetProperty, replacementCard);
    }
    setValidMoves(undefined);
    setCurrentPlayer(state.currentPlayer === 'Blue' ? 'Red' : 'Blue');
  };

  const setPauseGame = (pause: boolean): void => {
    dispatch({
      type: SET_PAUSE,
      pause,
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        clearGameState,
        movePiece,
        setClickedCard,
        setClickedPiece,
        setCurrentPlayer,
        setHasGameFinished,
        setIsCleared,
        setNextCard,
        setPassTurn,
        setPauseGame,
        setValidMoves,
        setWinMethod,
        setWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
