import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';
import {
  generateCardSet,
  checkMaster,
  checkTemple,
  generateEmptyCells,
} from '../utils';
import cloneDeep from 'lodash.clonedeep';

import {
  Piece,
  PlayerColor,
  State,
  WinMethods,
} from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import {
  SET_CLICKED_CARD,
  SET_CLICKED_PIECE,
  SET_NEXT_CARD,
  SET_CURRENT_PLAYER,
  SET_VALID_MOVES,
  MOVE_PIECE,
  SET_HAS_GAME_FINISHED,
  SET_WINNER,
  SET_WIN_METHOD,
  CLEAR_GAME_STATE,
  SET_IS_CLEARED,
} from '../types';

import { Player, Opponent } from '../state/playerState';

const cards: CardModel[] = generateCardSet();

const initialState: State = {
  board: cloneDeep([...Opponent, ...generateEmptyCells(), ...Player]),
  clickedCard: undefined,
  clickedPiece: undefined,
  currentPlayer: cards[4].stamp,
  isCleared: false,
  handBlue: { first: cards[2], second: cards[3] },
  handRed: { first: cards[0], second: cards[1] },
  hasGameFinished: false,
  nextCard: cards[4],
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
    dispatch({
      type: CLEAR_GAME_STATE,
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        setClickedCard,
        setClickedPiece,
        setNextCard,
        setCurrentPlayer,
        setValidMoves,
        movePiece,
        setHasGameFinished,
        setWinner,
        setWinMethod,
        clearGameState,
        setIsCleared,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
