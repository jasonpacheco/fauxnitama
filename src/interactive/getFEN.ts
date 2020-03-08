import {
  CardName,
  HAND_BLUE,
  HAND_RED,
  NEXT_CARD,
} from '../store/engine/types/cardTypes';
import { BLUE, Colors, PlayerType } from '../store/engine/types/gameTypes';
import { PiecePosition } from '../store/engine/types/pieceTypes';
import { getCards, idToPiece, PieceProperties } from '../store/utils';
import constants from '../utils/constants';

const pieceToCharacter = (piece: PieceProperties): string => {
  return piece.color.includes(BLUE)
    ? piece.type.charAt(0).toUpperCase()
    : piece.type.charAt(0).toLowerCase();
};

const cardToFEN = (name: CardName, isBlue = false): string => {
  interface Abbreviation {
    [key: string]: string;
  }

  const abbreviations: Abbreviation = {
    Bear: 'be',
    Boar: 'bo',
    Cobra: 'co',
    Crab: 'cb',
    Crane: 'ce',
    Dog: 'do',
    Dragon: 'dr',
    Eel: 'ee',
    Elephant: 'el',
    Fox: 'fo',
    Frog: 'fr',
    Giraffe: 'gi',
    Goose: 'go',
    Horse: 'ho',
    Iguana: 'ig',
    Kirin: 'ki',
    Mantis: 'ma',
    Monkey: 'my',
    Mouse: 'me',
    Otter: 'ot',
    Ox: 'ox',
    Panda: 'pa',
    Phoenix: 'ph',
    Rabbit: 'rb',
    Rat: 'rt',
    Rooster: 'ro',
    Sable: 'sa',
    'Sea Snake': 'ss',
    Tanuki: 'ta',
    Tiger: 'ti',
    Turtle: 'tu',
    Viper: 'vi',
  };

  const cardAbbreviation = abbreviations[name];
  return isBlue ? cardAbbreviation.toUpperCase() : cardAbbreviation;
};

const piecesList = (piecePositions: PiecePosition): number[] => {
  const list: number[] = [];
  Object.values(piecePositions).forEach(positionArray => {
    positionArray.forEach(([id]) => list.push(id));
  });
  return list;
};

export const getFEN = (
  piecePositions: PiecePosition,
  players: PlayerType[],
  cards: CardName[],
  currentPlayer: PlayerType,
  colors: Colors[]
): string => {
  let fen = '';
  const list = piecesList(piecePositions);
  for (let row = 0; row < constants.BOARD_ROWS; row++) {
    let emptyCount = 0,
      fileString = '';
    for (let col = 0; col < constants.BOARD_COLS; col++) {
      const id = constants.BOARD_ROWS * row + col;
      const idHasPiece = list.includes(id);
      if (!idHasPiece) ++emptyCount;
      else {
        if (emptyCount > 0) {
          fileString += `${emptyCount}`;
          emptyCount = 0;
        }
        fileString += pieceToCharacter(
          idToPiece(id, piecePositions, players) as PieceProperties
        );
      }
    }

    if (emptyCount > 0) {
      fileString += `${emptyCount}`;
    }

    fen += `${fileString}/`;
  }
  const handRedNames = getCards(cards, HAND_RED) as CardName[];
  const handBlueNames = getCards(cards, HAND_BLUE) as CardName[];
  const nextCardName = getCards(cards, NEXT_CARD) as CardName;

  const redCardFEN = `${cardToFEN(handRedNames[0])}-${cardToFEN(
    handRedNames[1]
  )}`;
  const blueCardFEN = `${cardToFEN(handBlueNames[0], true)}-${cardToFEN(
    handBlueNames[1],
    true
  )}`;

  const currentPlayerIndex = players.indexOf(currentPlayer);

  const nextCardFEN = `${cardToFEN(
    nextCardName,
    colors[currentPlayerIndex] === BLUE
  )}`;

  return colors[0] === BLUE
    ? `${fen}${blueCardFEN}/${redCardFEN}/${nextCardFEN}`
    : `${fen}${redCardFEN}/${blueCardFEN}/${nextCardFEN}`;
};
