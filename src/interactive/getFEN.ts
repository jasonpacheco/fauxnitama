import {
  SquareData,
  Piece,
  PlayerColor,
  PlayerHand,
} from '../interfaces/context.interface';
import CardModel from '../interfaces/card.interface';
import constants from '../utils/constants';

const pieceToCharacter = (piece: Piece): string => {
  return piece.color === 'Blue'
    ? piece.type.charAt(0).toUpperCase()
    : piece.type.charAt(0).toLowerCase();
};

const cardToFEN = (name: string, isBlue = false): string => {
  interface Abbreviation {
    [key: string]: string;
  }

  const abbreviations: Abbreviation = {
    Boar: 'bo',
    Cobra: 'co',
    Crab: 'cb',
    Crane: 'ce',
    Dragon: 'dr',
    Eel: 'ee',
    Elephant: 'el',
    Frog: 'fr',
    Goose: 'go',
    Horse: 'ho',
    Mantis: 'ma',
    Monkey: 'mo',
    Ox: 'ox',
    Rabbit: 'ra',
    Rooster: 'ro',
    Tiger: 'ti',
  };

  const cardAbbreviation = abbreviations[name];
  return isBlue ? cardAbbreviation.toUpperCase() : cardAbbreviation;
};

export const getFEN = (
  board: SquareData[],
  currentPlayer: PlayerColor,
  handBlue: PlayerHand,
  handRed: PlayerHand,
  nextCard: CardModel
): string => {
  let fen = '';
  for (let row = 0; row < constants.BOARD_ROWS; row++) {
    let emptyCount = 0,
      fileString = '';
    for (let col = 0; col < constants.BOARD_COLS; col++) {
      const pieceData = board[constants.BOARD_ROWS * row + col].piece;
      if (!pieceData) ++emptyCount;
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

    fen += `${fileString}/`;
  }
  const redCardFEN = `${cardToFEN(handRed.first.name)}-${cardToFEN(
    handRed.second.name
  )}`;
  const blueCardFEN = `${cardToFEN(handBlue.first.name, true)}-${cardToFEN(
    handBlue.second.name,
    true
  )}`;
  const nextCardFEN = `${cardToFEN(nextCard.name, currentPlayer === 'Blue')}`;

  return `${fen}${redCardFEN}/${blueCardFEN}/${nextCardFEN}`;
};
