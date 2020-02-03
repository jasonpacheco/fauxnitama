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
  const onCellClick = React.useCallback(
    (
      clickedCellID: number,
      clickedCellIsValidMove: boolean,
      piece: Piece | undefined
    ): void => {
      if (!hasGameFinished) {
        if (piece?.color === currentPlayer) {
          if (
            !clickedPiece ||
            clickedCellID !== clickedPiece.currentPositionID
          ) {
            setPiece(piece);
          }
        }

        if (clickedPiece && clickedCellIsValidMove) {
          movePiece(clickedPiece, clickedCellID);
        }
      }
    },
    [clickedPiece, currentPlayer, hasGameFinished, movePiece, setPiece]
  );
  console.log('Board rendered');
  return (
    <GridWrapper>
      <Grid>
        {cells.map(cell => (
          <Cell
            key={cell.id}
            clickedPiece={clickedPiece}
            cellIsValidMove={
              currentPlayer === clickedPiece?.color &&
              validMoves.includes(cell.id)
            }
            onCellClick={onCellClick}
            renderedID={cell.id}
            renderedPiece={cell.piece}
          />
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default Board;
