import React, { useReducer } from 'react';
// import gameReducer from './gameReducer';
// import GameContext from './gameContext';

// import {
//   CLEAR_GAME_STATE,
//   MOVE_PIECE,
//   SET_CLICKED_CARD,
//   SET_CLICKED_PIECE,
//   SET_CURRENT_PLAYER,
//   SET_HALFMOVES,
//   SET_HAS_GAME_FINISHED,
//   SET_IS_CLEARED,
//   SET_NEXT_CARD,
//   SET_PAUSE,
//   SET_VALID_MOVES,
//   SET_WIN_METHOD,
//   SET_WINNER,
//   ADD_MOVE_HISTORY,
//   UPDATE_PIECES,
// } from '../types';

// import CardModel from '../interfaces/card.interface';
// import {
//   Piece,
//   PlayerColor,
//   State,
//   WinMethods,
// } from '../interfaces/context.interface';
// import { Opponent, Player } from '../state/playerState';

// import {
//   checkMaster,
//   checkTemple,
//   generateCardSet,
//   generateEmptyCells,
// } from '../utils';
// import { moveNotation } from '../interactive/notation';
// import cloneDeep from 'lodash.clonedeep';
// import { getFEN } from '../interactive/getFEN';
// import constants from '../utils/constants';

// const cards: CardModel[] = generateCardSet();

// const initialState: State = {
//   board: cloneDeep([...Opponent, ...generateEmptyCells(), ...Player]),
//   clickedCard: undefined,
//   clickedPiece: undefined,
//   currentPlayer: cards[4].stamp,
//   halfmoves: 0,
//   handBlue: { first: cards[2], second: cards[3] },
//   handRed: { first: cards[0], second: cards[1] },
//   hasGameFinished: false,
//   isCleared: false,
//   moveHistory: [],
//   nextCard: cards[4],
//   pauseGame: false,
//   piecePositions: {
//     Blue: [20, 21, 22, 23, 24],
//     Red: [0, 1, 2, 3, 4],
//   },
//   validMoves: [],
//   winMethod: undefined,
//   winner: undefined,
// };

// const GameState: React.FC = ({ children }) => {
//   const [state, dispatch] = useReducer(gameReducer, initialState);

//   const addMoveHistory = (notation: string[]): void => {
//     dispatch({
//       type: ADD_MOVE_HISTORY,
//       notation,
//     });
//   };

//   // const getCurrentFEN = (): string => {
//   //   return getFEN(
//   //     state.board,
//   //     state.currentPlayer,
//   //     state.handBlue,
//   //     state.handRed,
//   //     state.nextCard
//   //   );
//   // };

//   const setValidMoves = (piece: Piece | undefined): void => {
//     dispatch({
//       type: SET_VALID_MOVES,
//       piece,
//     });
//   };

//   const setClickedPiece = (clickedPiece: Piece): void => {
//     dispatch({
//       type: SET_CLICKED_PIECE,
//       clickedPiece,
//     });
//     /** Implements move checking when cell is clicked */
//     if (state.clickedCard) {
//       console.log(state.clickedCard + 'in set clicked piece');
//       setValidMoves(clickedPiece);
//     }
//   };

//   const setIsCleared = (): void => {
//     dispatch({
//       type: SET_IS_CLEARED,
//     });
//   };

//   const setClickedCard = (clickedCard: CardModel): void => {
//     console.log(clickedCard.name + 'is in setClickedCard');
//     dispatch({
//       type: SET_CLICKED_CARD,
//       clickedCard,
//     });
//     /** Implements automatic move checking when the user selects another card */
//     if (state.clickedPiece) {
//       setValidMoves(state.clickedPiece);
//     }
//   };

//   const setNextCard = (
//     nextCard: CardModel,
//     targetProperty: 'handBlue' | 'handRed',
//     replacementCard: CardModel
//   ): void => {
//     dispatch({
//       type: SET_NEXT_CARD,
//       nextCard,
//       targetProperty,
//       replacementCard,
//     });
//   };

//   const setCurrentPlayer = (player: PlayerColor): void => {
//     dispatch({
//       type: SET_CURRENT_PLAYER,
//       player,
//     });
//   };

//   const setHasGameFinished = (): void => {
//     dispatch({
//       type: SET_HAS_GAME_FINISHED,
//     });
//   };

//   const setWinner = (winner: PlayerColor | undefined): void => {
//     dispatch({
//       type: SET_WINNER,
//       winner,
//     });
//   };

//   const setWinMethod = (winMethod: WinMethods): void => {
//     dispatch({
//       type: SET_WIN_METHOD,
//       winMethod,
//     });
//   };

//   const updatePieces = (
//     colorToUpdate: PlayerColor,
//     idBeforeUpdate: number,
//     idAfterUpdate: number,
//     moveIsCapture: boolean
//   ): void => {
//     dispatch({
//       type: UPDATE_PIECES,
//       colorToUpdate,
//       idBeforeUpdate,
//       idAfterUpdate,
//       moveIsCapture,
//     });
//   };

//   const setHalfmoves = (count: number): void => {
//     dispatch({
//       type: SET_HALFMOVES,
//       count,
//     });
//   };

//   const movePiece = (fromPiece: Piece, toID: number): void => {
//     // Define variables
//     const fromPlayer = fromPiece.color;
//     const isMoveCheckmate = checkMaster(state.board, toID);
//     const isMoveTempleCapture = checkTemple(fromPiece, toID);
//     const nextPlayer = fromPlayer === 'Blue' ? 'Red' : 'Blue';
//     const toIDPiece = state.board[toID]?.piece;
//     const moveIsCapture = toIDPiece !== undefined;
//     updatePieces(fromPlayer, fromPiece.currentPositionID, toID, moveIsCapture);

//     // if (state.clickedCard) {
//     //   const notation = moveNotation(
//     //     fromPlayer,
//     //     false,
//     //     !!toIDPiece || isMoveTempleCapture,
//     //     state.clickedCard.name,
//     //     fromPiece.type,
//     //     fromPiece.currentPositionID,
//     //     toID,
//     //     toIDPiece,
//     //     isMoveTempleCapture
//     //   );
//     //   addMoveHistory(notation);
//     // }

//     // Move the piece
//     dispatch({
//       type: MOVE_PIECE,
//       fromPiece,
//       toID,
//     });

//     if (state.clickedCard) {
//       const poppedNextCard = state.nextCard;
//       const targetProperty = fromPlayer === 'Blue' ? 'handBlue' : 'handRed';
//       setNextCard(state.clickedCard, targetProperty, poppedNextCard);
//     }
//     // Reset cell highlighting for valid moves and set next player
//     setValidMoves(undefined);
//     setCurrentPlayer(nextPlayer);

//     if (fromPlayer && isMoveCheckmate) {
//       setWinner(fromPlayer);
//       setWinMethod('capture-master');
//       setValidMoves(undefined);
//       setHasGameFinished();
//     } else if (fromPlayer && isMoveTempleCapture) {
//       setWinner(fromPlayer);
//       setWinMethod('capture-temple');
//       setValidMoves(undefined);
//       setHasGameFinished();
//     } else if (
//       state.halfmoves + 1 === constants.HALFMOVE_LIMIT &&
//       !moveIsCapture
//     ) {
//       setHalfmoves(state.halfmoves + 1);
//       setWinner(undefined);
//       setWinMethod('draw');
//       setValidMoves(undefined);
//       setHasGameFinished();
//       return;
//     }

//     if (moveIsCapture) {
//       setHalfmoves(0);
//     } else {
//       setHalfmoves(state.halfmoves + 1);
//     }
//   };

//   const clearGameState = (): void => {
//     setIsCleared();
//     setHasGameFinished();
//     dispatch({
//       type: CLEAR_GAME_STATE,
//     });
//   };

//   const setPassTurn = (): void => {
//     const replacementCard = state.nextCard;
//     const targetProperty =
//       state.currentPlayer === 'Blue' ? 'handBlue' : 'handRed';

//     // if (state.clickedCard) {
//     //   setNextCard(state.clickedCard, targetProperty, replacementCard);
//     //   const [didPass, didCapture] = [true, false];
//     //   const notation = moveNotation(
//     //     state.currentPlayer,
//     //     didPass,
//     //     didCapture,
//     //     state.clickedCard.name
//     //   );
//     //   addMoveHistory(notation);
//     // }
//     setValidMoves(undefined);
//     setCurrentPlayer(state.currentPlayer === 'Blue' ? 'Red' : 'Blue');
//     if (state.halfmoves + 1 === constants.HALFMOVE_LIMIT) {
//       setHalfmoves(state.halfmoves + 1);
//       setWinner(undefined);
//       setWinMethod('draw');
//       setHasGameFinished();
//       return;
//     }
//     setHalfmoves(state.halfmoves + 1);
//   };

//   const setPauseGame = (pause: boolean): void => {
//     dispatch({
//       type: SET_PAUSE,
//       pause,
//     });
//   };

//   return (
//     <GameContext.Provider
//       value={{
//         ...state,
//         addMoveHistory,
//         clearGameState,
//         getCurrentFEN,
//         movePiece,
//         setClickedCard,
//         setClickedPiece,
//         setCurrentPlayer,
//         setHalfmoves,
//         setHasGameFinished,
//         setIsCleared,
//         setNextCard,
//         setPassTurn,
//         setPauseGame,
//         setValidMoves,
//         setWinMethod,
//         setWinner,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };

// export default GameState;
