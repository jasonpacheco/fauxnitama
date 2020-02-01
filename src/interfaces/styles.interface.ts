import { PlayerColor } from './context.interface';

// Interfaces for BoardSetup component(s)
export interface FullWrapperStyleProps {
  playerColorToRight: PlayerColor;
}

// Interfaces for Board component(s)
export interface BoxStyleProps {
  hasTempleBackground: string | boolean;
  highlightSelectedPiece: boolean;
  highlightValidCell: PlayerColor | boolean | undefined;
}

// Interfaces for Card component(s)
export interface CardWrapperStyleProps {
  invert: boolean;
  isActive: boolean;
}

export interface MiniBoxStyleProps {
  center?: boolean;
  hasColor?: string | undefined;
}

export interface StampTooltipStyleProps {
  invert: boolean;
}

export interface StampStyleProps {
  color: PlayerColor;
}

// Interfaces for Modal component(s)
export interface EndMessageContentStyleProps {
  winner: PlayerColor;
}

// Interfaces for Piece component(s)
export interface PieceWrapperStyleProps {
  isRotated: boolean;
}
