import { PlayerColor, Piece } from '../interfaces/context.interface';

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
  piece?: Piece,
  fromID?: number,
  toID?: number,
  capturedPiece?: Piece,
  didCaptureTemple?: boolean
): string[] => {
  if (didPass) {
    return [`${player === 'Blue' ? 'BP' : 'RP'}`, 'pt', '', `(${cardName})`];
  }

  const currentPlayerColor = player.charAt(0);
  const otherPlayerColor = currentPlayerColor === 'B' ? 'R' : 'B';
  const captured = didCaptureTemple ? 'T' : capturedPiece?.type.charAt(0);
  const token1 = `${player.charAt(0)}${piece?.type.charAt(0)}`;
  const token2 = `[${fromID},${toID}]`;
  const token3 = `${didCapture ? `x${otherPlayerColor}${captured}` : ''}`;
  const token4 = `(${cardName})`;
  return [token1, token2, token3, token4];
};
