import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import {
  CellData,
  Piece,
  PlayerColor,
} from '../../interfaces/context.interface';

interface BoardProps {
  cells: CellData[];
  clickedPiece: Piece | undefined;
  currentPlayer: PlayerColor;
  hasGameFinished: boolean;
  movePiece: (fromPiece: Piece, toID: number) => void;
  pauseGame: boolean;
  setPiece: (piece: Piece) => void;
  validMoves: number[];
}

const Board: React.FC<BoardProps> = ({
  cells,
  clickedPiece,
  currentPlayer,
  hasGameFinished,
  movePiece,
  pauseGame,
  setPiece,
  validMoves,
}) => {
  const onCellClick = (clickedCellID: number): void => {
    if (!hasGameFinished && !pauseGame) {
      const piece = cells[clickedCellID].piece;
      if (piece?.color === currentPlayer) {
        if (!clickedPiece || clickedCellID !== clickedPiece.currentPositionID) {
          setPiece(piece);
        }
      }
      if (clickedPiece && validMoves.includes(clickedCellID)) {
        movePiece(clickedPiece, clickedCellID);
      }
    }
  };

  return (
    <GridWrapper>
      <Grid>
        {cells.map((cell: CellData) => (
          <Cell
            key={cell.id}
            cellIsValidMove={
              currentPlayer === clickedPiece?.color &&
              validMoves.includes(cell.id)
            }
            currentPlayer={currentPlayer}
            highlightClickedPiece={
              !!cell.piece && cell.id === clickedPiece?.currentPositionID
            }
            onCellClick={onCellClick}
            renderedCell={cell}
          />
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default Board;
