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
  const onCellClick = (
    clickedCellID: number,
    clickedCellIsValidMove: boolean,
    piece: Piece | undefined
  ): void => {
    if (!hasGameFinished) {
      if (piece?.color === currentPlayer) {
        if (!clickedPiece || clickedCellID !== clickedPiece.currentPositionID) {
          setPiece(piece);
        }
      }

      if (clickedPiece && clickedCellIsValidMove) {
        movePiece(clickedPiece, clickedCellID);
      }
    }
  };
  // console.log('Board rendered');
  return (
    <GridWrapper>
      <Grid>
        {/* {cells.map(cell => (
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
        ))} */}

        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[0].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[0].id}
          renderedPiece={cells[0].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[1].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[1].id}
          renderedPiece={cells[1].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[2].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[2].id}
          renderedPiece={cells[2].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[3].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[3].id}
          renderedPiece={cells[3].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[4].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[4].id}
          renderedPiece={cells[4].piece}
        />

        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[5].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[5].id}
          renderedPiece={cells[5].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[6].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[6].id}
          renderedPiece={cells[6].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[7].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[7].id}
          renderedPiece={cells[7].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[8].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[8].id}
          renderedPiece={cells[8].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[9].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[9].id}
          renderedPiece={cells[9].piece}
        />

        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[10].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[10].id}
          renderedPiece={cells[10].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[11].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[11].id}
          renderedPiece={cells[11].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[12].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[12].id}
          renderedPiece={cells[12].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[13].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[13].id}
          renderedPiece={cells[13].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[14].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[14].id}
          renderedPiece={cells[14].piece}
        />

        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[15].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[15].id}
          renderedPiece={cells[15].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[16].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[16].id}
          renderedPiece={cells[16].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[17].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[17].id}
          renderedPiece={cells[17].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[18].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[18].id}
          renderedPiece={cells[18].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[19].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[19].id}
          renderedPiece={cells[19].piece}
        />

        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[20].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[20].id}
          renderedPiece={cells[20].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[21].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[21].id}
          renderedPiece={cells[21].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[22].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[22].id}
          renderedPiece={cells[22].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[23].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[23].id}
          renderedPiece={cells[23].piece}
        />
        <Cell
          clickedPiece={clickedPiece}
          cellIsValidMove={
            currentPlayer === clickedPiece?.color &&
            validMoves.includes(cells[24].id)
          }
          onCellClick={onCellClick}
          renderedID={cells[24].id}
          renderedPiece={cells[24].piece}
        />
      </Grid>
    </GridWrapper>
  );
};

export default Board;
