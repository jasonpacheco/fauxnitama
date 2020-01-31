import React, { useReducer } from 'react';
import gameReducer from './gameReducer';
import GameContext from './gameContext';
import { generateCardSet, checkMaster, checkTemple } from '../utils';
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
} from '../types';

import moveChecker from '../interactive/moveChecker';

const Opponent: CellData[] = [
  {
    id: 0,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 0 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 1,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 1 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 2,
    piece: { color: 'Red', type: 'Master', currentPosition: { x: 0, y: 2 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 3,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 3 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
  {
    id: 4,
    piece: { color: 'Red', type: 'Student', currentPosition: { x: 0, y: 4 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: false,
    isRed: true,
  },
];

const Player: CellData[] = [
  {
    id: 20,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 0 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 21,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 1 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 22,
    piece: { color: 'Blue', type: 'Master', currentPosition: { x: 4, y: 2 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 23,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 3 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
  {
    id: 24,
    piece: { color: 'Blue', type: 'Student', currentPosition: { x: 4, y: 4 } },
    isValidMove: false,
    isEmpty: false,
    isBlue: true,
    isRed: false,
  },
];

const EmptySpaceGenerator = (): CellData[] => {
  const cells = [];
  for (let i = 5; i <= 19; i++) {
    cells.push({
      id: i,
      piece: null,
      isValidMove: false,
      isEmpty: true,
      isBlue: false,
      isRed: false,
    });
  }
  return cells;
};

const cards: CardModel[] = generateCardSet();

const initialState: State = {
  selectedCell: undefined,
  selectedCard: undefined,
  currentPlayer: cards[4].stamp,
  cardSet: cards,
  firstPlayer: cards[4].stamp,
  redHand: { first: cards[0], second: cards[1] },
  blueHand: { first: cards[2], second: cards[3] },
  nextCard: cards[4],
  validMoves: undefined,
  hasGameFinished: false,
  winner: undefined,
  winMethod: undefined,
  board: {
    cells: [...Opponent, ...EmptySpaceGenerator(), ...Player],
  },
};

const GameState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getBoard = (): CellData[] => {
    return state.board.cells;
  };

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
          getBoard(),
          state.currentPlayer
        )
      );
    }
  };

  const setCurrentCard = (currentCard: CardModel): void => {
    dispatch({
      type: SET_CURRENT_CARD,
      currentCard,
    });

    /** Implements automatic move checking when the user selects another card */
    if (!!state?.selectedCell?.piece) {
      setValidMoves(
        moveChecker(
          state.selectedCell.piece.currentPosition,
          currentCard.moves,
          getBoard(),
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
    const isMoveTempleCapture = checkTemple(fromPlayerType, toID);
    if (isMoveCheckmate) {
      console.log('Opponent master has been captured!');
      setHasGameFinished();
    } else if (isMoveTempleCapture) {
      console.log('Opponent temple has been captured!');
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

  return (
    <GameContext.Provider
      value={{
        ...state,
        getBoard,
        setSelectedCell,
        setCurrentCard,
        setNextCard,
        setCurrentPlayer,
        setValidMoves,
        movePiece,
        setHasGameFinished,
        setWinner,
        setWinMethod,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
