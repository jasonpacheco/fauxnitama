import {
  CLEAR_GAME_STATE,
  MOVE_PIECE,
  SET_CLICKED_CARD,
  SET_CLICKED_PIECE,
  SET_CURRENT_PLAYER,
  SET_HALFMOVES,
  SET_HAS_GAME_FINISHED,
  SET_IS_CLEARED,
  SET_NEXT_CARD,
  SET_PAUSE,
  SET_VALID_MOVES,
  SET_WIN_METHOD,
  SET_WINNER,
  ADD_MOVE_HISTORY,
  UPDATE_PIECES,
} from '../types';
import { State, Actions } from '../interfaces/context.interface';
import { generateCardSet, generateEmptyCells } from '../utils';
import isEqual from 'lodash.isequal';
import CardModel from '../interfaces/card.interface';
import { Player, Opponent } from '../state/playerState';
import cloneDeep from 'lodash.clonedeep';
import moveChecker from '../interactive/moveChecker';

export default (state: State, action: Actions): State => {
  switch (action.type) {
    case ADD_MOVE_HISTORY:
      return {
        ...state,
        moveHistory: [...state.moveHistory, action.notation],
      };

    case CLEAR_GAME_STATE:
      const newCards: CardModel[] = generateCardSet();
      const newBoard = [...Opponent, ...generateEmptyCells(), ...Player];
      return {
        board: cloneDeep(newBoard),
        clickedCard: undefined,
        clickedPiece: undefined,
        currentPlayer: newCards[4]?.stamp,
        halfmoves: 0,
        handBlue: { first: newCards[2], second: newCards[3] },
        handRed: { first: newCards[0], second: newCards[1] },
        hasGameFinished: false,
        isCleared: false,
        moveHistory: [],
        nextCard: newCards[4],
        pauseGame: false,
        piecePositions: {
          Blue: [20, 21, 22, 23, 24],
          Red: [0, 1, 2, 3, 4],
        },
        validMoves: [],
        winMethod: undefined,
        winner: undefined,
      };

    case MOVE_PIECE:
      const fromPiece = action.fromPiece;
      const fromID = action.fromPiece.currentPositionID;
      fromPiece.currentPositionID = action.toID;

      state.board[action.toID] = {
        id: action.toID,
        piece: fromPiece,
      };

      state.board[fromID] = {
        id: fromID,
        piece: undefined,
      };

      return {
        ...state,
      };

    case SET_CLICKED_CARD:
      console.log('set clicked card reducer', action.clickedCard);
      return {
        ...state,
        clickedCard: action.clickedCard,
      };

    case SET_CLICKED_PIECE:
      console.log('set clicked piece reducer', action.clickedPiece);

      return {
        ...state,
        clickedPiece: action.clickedPiece,
      };

    case SET_CURRENT_PLAYER:
      return {
        ...state,
        clickedCard: undefined,
        currentPlayer: action.player,
      };

    case SET_HALFMOVES:
      return {
        ...state,
        halfmoves: action.count,
      };

    case SET_HAS_GAME_FINISHED:
      return {
        ...state,
        clickedCard: undefined,
        hasGameFinished: true,
      };

    case SET_IS_CLEARED:
      return {
        ...state,
        isCleared: true,
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

    case SET_PAUSE:
      return {
        ...state,
        pauseGame: action.pause,
      };

    case SET_VALID_MOVES:
      if (action.piece) {
        const moveIDs = moveChecker(
          action.piece,
          state.clickedCard?.moves,
          state.board
        );

        return {
          ...state,
          validMoves: moveIDs,
        };
      } else {
        return {
          ...state,
          clickedPiece: undefined,
          validMoves: [],
        };
      }

    case SET_WIN_METHOD:
      return {
        ...state,
        winMethod: action.winMethod,
      };

    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };

    case UPDATE_PIECES:
      const otherPlayerColor = action.colorToUpdate === 'Blue' ? 'Red' : 'Blue';
      const updatePlayerPositions = state.piecePositions[action.colorToUpdate];
      const otherPlayerPositions = state.piecePositions[otherPlayerColor];
      const indexToUpdate = updatePlayerPositions.indexOf(
        action.idBeforeUpdate
      );
      if (action.moveIsCapture) {
        const indexToDelete = otherPlayerPositions.indexOf(
          action.idAfterUpdate
        );
        otherPlayerPositions.splice(indexToDelete, 1);
        otherPlayerPositions.sort((a, b) => a - b);
      }
      updatePlayerPositions.splice(indexToUpdate, 1, action.idAfterUpdate);
      updatePlayerPositions.sort((a, b) => a - b);

      return {
        ...state,
      };

    default:
      return state;
  }
};
