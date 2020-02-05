import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import {
  CellData,
  Piece,
  PlayerColor,
} from '../../interfaces/context.interface';

interface BoardProps {
  clickedPiece: Piece | undefined;
  cells: CellData[];
  currentPlayer: PlayerColor;
  hasGameFinished: boolean;
  movePiece: (fromPiece: Piece, toID: number) => void;
  setPiece: (piece: Piece) => void;
  validMoves: number[];
}

const Board: React.FC<BoardProps> = ({
  cells,
  clickedPiece,
  currentPlayer,
  hasGameFinished,
  movePiece,
  setPiece,
  validMoves,
}) => {
  const onCellClick = (clickedCellID: number): void => {
    if (!hasGameFinished) {
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

  // console.log('Board rendered');
  return (
    <GridWrapper>
      <Grid>
        {cells.map((cell: CellData) => (
          <Cell
            key={cell.id}
            highlightClickedPiece={
              !!cell.piece && cell.id === clickedPiece?.currentPositionID
            }
            cellIsValidMove={
              currentPlayer === clickedPiece?.color &&
              validMoves.includes(cell.id)
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
