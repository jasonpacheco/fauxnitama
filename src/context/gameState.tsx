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
  State,
  CellData,
  PlayerColor,
  WinMethods,
} from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import {
  SET_SELECTED_CELL,
  SET_CURRENT_CARD,
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

import moveChecker from '../interactive/moveChecker';
import { Player, Opponent } from '../state/playerState';

const cards: CardModel[] = generateCardSet();

const initialState: State = {
  selectedCell: undefined,
  selectedCard: undefined,
  currentPlayer: cards[4].stamp,
  firstPlayer: cards[4].stamp,
  redHand: { first: cards[0], second: cards[1] },
  blueHand: { first: cards[2], second: cards[3] },
  nextCard: cards[4],
  validMoves: undefined,
  hasGameFinished: false,
  winner: undefined,
  winMethod: undefined,
  isCleared: false,
  board: {
    cells: cloneDeep([...Opponent, ...generateEmptyCells(), ...Player]),
  },
};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setValidMoves = (moves: number[]): void => {
    dispatch({
      type: SET_VALID_MOVES,
      moves,
    });
  };

  const setSelectedCell = (cell: CellData): void => {
    dispatch({
      type: SET_SELECTED_CELL,
      cell,
    });
    /** Implements move checking when cell is clicked */
    if (cell.piece && state.selectedCard) {
      setValidMoves(
        moveChecker(
          cell.piece.currentPosition,
          state.selectedCard.moves,
          state.board.cells,
          state.currentPlayer
        )
      );
    }
  };

  const setIsCleared = (): void => {
    dispatch({
      type: SET_IS_CLEARED,
    });
  };

  const setCurrentCard = (currentCard: CardModel): void => {
    dispatch({
      type: SET_CURRENT_CARD,
      currentCard,
    });

    /** Implements automatic move checking when the user selects another card */

    if (state?.selectedCell?.piece) {
      setValidMoves(
        moveChecker(
          state.selectedCell.piece.currentPosition,
          currentCard.moves,
          state.board.cells,
          state.currentPlayer
        )
      );
    }
  };

  const setNextCard = (
    nextCard: CardModel,
    targetProperty: 'blueHand' | 'redHand',
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

  const movePiece = (fromCell: CellData, toID: number): void => {
    const from = cloneDeep(fromCell);
    const fromPlayer = from.piece?.color;
    const fromPlayerType = from.piece?.type;
    const nextPlayer = fromPlayer === 'Blue' ? 'Red' : 'Blue';
    const isMoveCheckmate = checkMaster(toID, state.board.cells);
    const isMoveTempleCapture = checkTemple(fromPlayer, fromPlayerType, toID);
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
      fromCell: from,
      toID,
    });

    if (state.selectedCard) {
      const poppedNextCard = state.nextCard;
      const targetProperty = fromPlayer === 'Blue' ? 'blueHand' : 'redHand';
      setNextCard(state.selectedCard, targetProperty, poppedNextCard);
    }

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
        setSelectedCell,
        setCurrentCard,
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
