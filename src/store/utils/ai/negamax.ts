import { cardSwapper } from '../';
import { CardName } from '../../engine/types/cardTypes';
import { PlayerType } from '../../engine/types/gameTypes';
import { PiecePosition, PieceTuple } from '../../engine/types/pieceTypes';
import getPieceFromSquare from '../getPieceFromSquare';
import getAllPossibleMoves from './getAllPossibleMoves';
import heuristic from './heuristic';
import updatePositions from './updatePositions';

export interface GameState {
  piecePositions: PiecePosition;
  cards: CardName[];
  currentPlayer: PlayerType;
  players: PlayerType[];
  halfmoves: number;
}

const negamax = (
  gameState: GameState,
  depth: number,
  alpha: number,
  beta: number,
  isUser: boolean
): number => {
  const [score, hasGameFinished] = heuristic(
    gameState.piecePositions,
    gameState.players,
    gameState.halfmoves
  );

  if (depth === 0) {
    return isUser ? -score : score;
  }

  let max = -Infinity;

  const currentPieces = gameState.piecePositions[gameState.currentPlayer];

  for (let i = 0; i < currentPieces.length; i++) {
    const pieceID = currentPieces[i][0];
    const piecePossibleMoves = getAllPossibleMoves(
      gameState.cards,
      gameState.players,
      pieceID,
      gameState.currentPlayer,
      gameState.piecePositions
    );

    for (let j = 0; j < piecePossibleMoves.length; j++) {
      const [cardName, toID] = piecePossibleMoves[j];

      const nextPlayer =
        gameState.players[
          1 - gameState.players.indexOf(gameState.currentPlayer)
        ];

      const pieceOccupyingID = getPieceFromSquare(
        toID,
        gameState.piecePositions[nextPlayer]
      );

      const nextGameState = JSON.parse(
        JSON.stringify({
          piecePositions: updatePositions(
            gameState.piecePositions,
            pieceID,
            toID,
            gameState.players,
            gameState.currentPlayer
          ),
          cards: cardSwapper(gameState.cards, cardName),
          currentPlayer: nextPlayer,
          players: gameState.players,
          halfmoves: pieceOccupyingID ? 0 : gameState.halfmoves + 1,
        })
      );

      max = Math.max(
        max,
        -negamax(nextGameState, depth - 1, -beta, -alpha, isUser ? false : true)
      );

      alpha = Math.max(alpha, max);
      if (alpha >= beta) break;
    }
  }

  return max;
};

export interface OptimalMove {
  piece: PieceTuple;
  cardName: CardName;
  moveToID: number;
}

const negamaxRoot = (gameState: GameState, depth: number): OptimalMove => {
  console.time('negamax');
  let optimalMove = {};

  let alpha = -Infinity;
  const beta = Infinity;

  const currentPieces = gameState.piecePositions[gameState.currentPlayer];
  for (let i = 0; i < currentPieces.length; i++) {
    const pieceID = currentPieces[i][0];
    const piecePossibleMoves = getAllPossibleMoves(
      gameState.cards,
      gameState.players,
      pieceID,
      gameState.currentPlayer,
      gameState.piecePositions
    );

    for (let j = 0; j < piecePossibleMoves.length; j++) {
      const [cardName, toID] = piecePossibleMoves[j];
      const nextPlayer =
        gameState.players[
          1 - gameState.players.indexOf(gameState.currentPlayer)
        ];

      const pieceOccupyingID = getPieceFromSquare(
        toID,
        gameState.piecePositions[nextPlayer]
      );

      const nextGameState = JSON.parse(
        JSON.stringify({
          piecePositions: updatePositions(
            gameState.piecePositions,
            pieceID,
            toID,
            gameState.players,
            gameState.currentPlayer
          ),
          cards: cardSwapper(gameState.cards, cardName),
          currentPlayer: nextPlayer,
          players: gameState.players,
          halfmoves: pieceOccupyingID ? 0 : gameState.halfmoves + 1,
        })
      );

      const score = -negamax(nextGameState, depth - 1, -beta, -alpha, true);

      if (score > alpha) {
        alpha = score;
        optimalMove = {
          piece: currentPieces[i],
          cardName,
          moveToID: toID,
        };
      }
    }
  }
  console.timeEnd('negamax');
  return optimalMove as OptimalMove;
};

export default negamaxRoot;
