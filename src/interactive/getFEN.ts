import {
  CellData,
  Piece,
  PlayerColor,
  PlayerHand,
} from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';

const pieceToCharacter = (piece: Piece): string => {
  return piece.color === 'Blue'
    ? piece.type.charAt(0).toUpperCase()
    : piece.type.charAt(0).toLowerCase();
};

const cardToFEN = (card: CardModel, isBlue = false): string => {
  const name = card.name;
  let cardAbbreviation = '';
  switch (name) {
    case 'Boar':
      cardAbbreviation = 'bo';
      break;
    case 'Cobra':
      cardAbbreviation = 'co';
      break;
    case 'Crab':
      cardAbbreviation = 'cb';
      break;
    case 'Crane':
      cardAbbreviation = 'ce';
      break;
    case 'Dragon':
      cardAbbreviation = 'dr';
      break;
    case 'Eel':
      cardAbbreviation = 'ee';
      break;
    case 'Elephant':
      cardAbbreviation = 'el';
      break;
    case 'Frog':
      cardAbbreviation = 'fr';
      break;
    case 'Goose':
      cardAbbreviation = 'go';
      break;
    case 'Horse':
      cardAbbreviation = 'ho';
      break;
    case 'Mantis':
      cardAbbreviation = 'ma';
      break;
    case 'Monkey':
      cardAbbreviation = 'mo';
      break;
    case 'Ox':
      cardAbbreviation = 'ox';
      break;
    case 'Rabbit':
      cardAbbreviation = 'ra';
      break;
    case 'Rooster':
      cardAbbreviation = 'ro';
      break;
    case 'Tiger':
      cardAbbreviation = 'ti';
      break;
  }
  return isBlue ? cardAbbreviation.toUpperCase() : cardAbbreviation;
};

export const getFEN = (
  board: CellData[],
  handRed: PlayerHand,
  handBlue: PlayerHand,
  nextCard: CardModel,
  currentPlayer: PlayerColor
): string => {
  const fenData: string[] = [];
  for (let row = 0; row < 5; row++) {
    let emptyCount = 0;
    let fileString = '';
    for (let col = 0; col < 5; col++) {
      const pieceData = board[5 * row + col].piece;
      if (pieceData === undefined) ++emptyCount;
      else {
        if (emptyCount > 0) {
          fileString += `${emptyCount}`;
          emptyCount = 0;
        }
        fileString += pieceToCharacter(pieceData);
      }
    }

    if (emptyCount > 0) {
      fileString += `${emptyCount}`;
    }

    fenData.push(fileString);
  }
  fenData.push(`${cardToFEN(handRed.first)}-${cardToFEN(handRed.second)}`);
  fenData.push(
    `${cardToFEN(handBlue.first, true)}-${cardToFEN(handBlue.second, true)}`
  );
  fenData.push(`${cardToFEN(nextCard, currentPlayer === 'Blue')}`);
  return fenData.join('/');
};
