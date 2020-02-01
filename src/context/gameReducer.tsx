import { CellData, State, Actions } from '../interfaces/context.interface';

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
import { idToCoordinate, generateCardSet, generateEmptyCells } from '../utils';
import isEqual from 'lodash.isequal';
import CardModel from '../interfaces/card.interface';
import { Player, Opponent } from '../state/playerState';
import cloneDeep from 'lodash.clonedeep';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return {
        ...state,
        selectedCell: action.cell,
      };
    case SET_CURRENT_CARD:
      return {
        ...state,
        selectedCard: action.currentCard,
      };
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        selectedCard: undefined,
        currentPlayer: action.player,
      };
    case SET_NEXT_CARD:
      const playerHand = state[action.targetProperty];
      const keyToReplace = Object.keys(playerHand).find(key =>
        isEqual(playerHand[key], action.nextCard)
      );

      if (keyToReplace) {
        playerHand[keyToReplace] = action.replacementCard;
      }

      return {
        ...state,
        ...playerHand,
        nextCard: action.nextCard,
      };

    case SET_VALID_MOVES:
      /**
       *


          cells: cloneDeep({
            ...state.board.cells,
            ...action.moves.map(moveID => {
              const cell = state.board.cells[moveID];
              console.log('How many times did I run?', cell);
              return {
                ...cell,
                isValidMove: true,
              };
            }),
          }),
       *
       *
       */
      console.log('in valid moves reducer');
      console.log('state.board.cells', state.board.cells);
      console.log('action.moves', action.moves);
      return {
        ...state,
        board: {
          cells: state.board.cells.map(cell => {
            console.log('I ran inside valid moves reducer');
            cell.isValidMove = action.moves.includes(cell.id);
            return cell;
          }),
        },
      };
    case MOVE_PIECE:
      return {
        ...state,
        board: {
          cells: state.board.cells.map((cell: CellData) => {
            const fromCell = action.fromCell;
            cell.isValidMove = false;
            if (cell.id === fromCell.id) {
              cell.piece = null;
              cell.isEmpty = true;
            }

            if (fromCell.piece && cell.id === action.toID) {
              cell.piece = fromCell.piece;
              cell.piece.currentPosition = idToCoordinate(cell.id);
              cell.isEmpty = false;
            }
            return cell;
          }),
        },
      };
    case SET_HAS_GAME_FINISHED:
      return {
        ...state,
        hasGameFinished: true,
      };

    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    case SET_WIN_METHOD:
      return {
        ...state,
        winMethod: action.winMethod,
      };

    case SET_IS_CLEARED:
      return {
        ...state,
        isCleared: true,
      };

    case CLEAR_GAME_STATE:
      const newCards: CardModel[] = generateCardSet();
      const newBoard = [...Opponent, ...generateEmptyCells(), ...Player];
      return {
        selectedCell: undefined,
        selectedCard: undefined,
        currentPlayer: newCards[4].stamp,
        firstPlayer: newCards[4].stamp,
        redHand: { first: newCards[0], second: newCards[1] },
        blueHand: { first: newCards[2], second: newCards[3] },
        nextCard: newCards[4],
        validMoves: undefined,
        hasGameFinished: false,
        winner: undefined,
        winMethod: undefined,
        isCleared: false,
        board: { cells: cloneDeep(newBoard) },
      };

    default:
      return state;
  }
};
