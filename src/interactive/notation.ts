import {
  PlayerColor,
  Piece,
  PlayerType,
} from '../interfaces/context.interface';
import { idToGridLocation } from '../utils';
/**
 *
 * @param player 'Blue' | 'Red', current player color.
 * @param didPass true if player passed their turn.
 * @param didCapture true if player's move captured opponent's piece.
 * @param cardName string name of the card used.
 * @param piece (opt) player's Piece that committed move.
 * @param fromID (opt) numeric ID for piece's original position ID.
 * @param toID (opt) numeric ID for piece's final position ID.
 * @param capturedPiece (opt) opponent's Piece that was captured.
 * @param didCaptureTemple (opt) true if opposing temple was captured.
 */
export const moveNotation = (
  player: PlayerColor,
  didPass: boolean,
  didCapture: boolean,
  cardName: string,
  pieceType?: PlayerType,
  fromID?: number,
  toID?: number,
  capturedPiece?: Piece,
  didCaptureTemple?: boolean
): string[] => {
  if (didPass) {
    return [`${cardName}`, `${player === 'Blue' ? 'BP' : 'RP'}`, '', ' pt '];
  }

  const currentPlayerColor = player.charAt(0);
  const otherPlayerColor = currentPlayerColor === 'B' ? 'R' : 'B';
  const captured = didCaptureTemple
    ? 'T'
    : capturedPiece?.type.charAt(0) === 'M'
    ? 'M'
    : '';
  const token0 = `${cardName}`;
  const token1 = `${currentPlayerColor}${
    pieceType?.charAt(0) === 'M' ? 'M' : ''
  }${idToGridLocation(fromID)}`;
  const token2 = `${didCapture ? `x${otherPlayerColor}${captured}` : ' '}`;
  const token3 = `${idToGridLocation(toID)}`;
  const token4 = captured === 'M' || captured === 'T' ? '++' : '';
  return [token0, token1, token2, token3, token4];
};
