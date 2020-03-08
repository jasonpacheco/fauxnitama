import { getPlayerCards } from '../';
import { cardNameToCard } from '../../../utils';
import { CardName } from '../../engine/types/cardTypes';
import { PLAYER_AI, PlayerType } from '../../engine/types/gameTypes';
import { PiecePosition } from '../../engine/types/pieceTypes';
import getMoves from '../getMoves';

export type PossibleMoves = [CardName, number][];

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
      possibleMovesList.push([cardList[i].name, moveID]);
    }
  }

  return possibleMovesList;
};

export default getAllPossibleMoves;
