import { idToGridLocation } from '../utils';
import { Colors, BLUE } from '../store/engine/types/gameTypes';
import { CardName } from '../store/engine/types/cardTypes';
import { PieceType } from '../store/engine/types/pieceTypes';
/**
 *
 * @param player BLUE | RED, current player color.
 * @param didPass true if player passed their turn.
 * @param didCapture true if player's move captured opponent's piece.
 * @param cardName name of the card used.
 * @param piece (opt) player's Piece that committed move.
 * @param fromID (opt) numeric ID for piece's original position ID.
 * @param toID (opt) numeric ID for piece's final position ID.
 * @param capturedPiece (opt) opponent's Piece that was captured.
 * @param didCaptureTemple (opt) true if opposing temple was captured.
 */
export const moveNotation = (
  player: Colors,
  didPass: boolean,
  didCapture: boolean,
  cardName: CardName,
  pieceType?: PieceType,
  fromID?: number,
  toID?: number,
  capturedPieceType?: PieceType | undefined,
  didCaptureTemple?: boolean
): string[] => {
  if (didPass) {
    return [cardName, `${player === BLUE ? 'BP' : 'RP'}`, '', ' pt ', ''];
  }

  const currentPlayerColor = player.charAt(0);
  const otherPlayerColor = currentPlayerColor === 'B' ? 'R' : 'B';
  const captured = didCaptureTemple
    ? 'T'
    : capturedPieceType?.charAt(0) === 'M'
    ? 'M'
    : '';
  const token0 = cardName;
  const token1 = `${currentPlayerColor}${
    pieceType?.charAt(0) === 'M' ? 'M' : ''
  }${idToGridLocation(fromID)}`;
  const token2 = `${didCapture ? `x${otherPlayerColor}${captured}` : ' '}`;
  const token3 = `${idToGridLocation(toID)}`;
  const token4 = captured === 'M' || captured === 'T' ? '++' : '';
  return [token0, token1, token2, token3, token4];
};
