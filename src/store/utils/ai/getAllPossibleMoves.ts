import getMoves from '../getMoves';
import { getPlayerCards } from '..';
import { CardName } from '../../engine/types/cardTypes';
import { PlayerType, PLAYER_AI } from '../../engine/types/gameTypes';
import { PiecePosition, PieceTuple } from '../../engine/types/pieceTypes';
import { cardNameToCard } from '../../../utils';

export type PossibleMoves = [CardName, number][];

const isValidMove = (positions: PieceTuple[], idToCheck: number): boolean => {
  return positions.find(([id]) => id === idToCheck) ? false : true;
};

const getAllPossibleMoves = (
  cards: CardName[],
  players: PlayerType[],
  selectedPieceID: number,
  currentPlayer: PlayerType,
  piecePositions: PiecePosition
): PossibleMoves => {
  const positions = piecePositions[currentPlayer];
  const playerCards = getPlayerCards(cards, players, currentPlayer);
  // prettier-ignore
  const cardList = [cardNameToCard(playerCards[0]), cardNameToCard(playerCards[1])];
  const possibleMovesList: PossibleMoves = [];

  for (let i = 0; i < playerCards.length; i++) {
    const moves = getMoves(
      selectedPieceID,
      currentPlayer === PLAYER_AI,
      cardList[i].moves,
      positions
    );

    for (let j = 0; j < moves.length; j++) {
      const moveID = moves[j];
      if (isValidMove(positions, moveID)) {
        possibleMovesList.push([cardList[i].name, moveID]);
      }
    }
  }

  return possibleMovesList;
};

export default getAllPossibleMoves;
