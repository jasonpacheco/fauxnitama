import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid, LetterRow, NumberColumn } from './_BoardStyles';
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
      <LetterRow>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
        <span>E</span>
      </LetterRow>
      <div style={{ display: 'flex' }}>
        <NumberColumn>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </NumberColumn>
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
              pauseGame={pauseGame}
              renderedCell={cell}
            />
          ))}
        </Grid>
        <NumberColumn invert>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </NumberColumn>
      </div>
      <LetterRow invert>
        <span>E</span>
        <span>D</span>
        <span>C</span>
        <span>B</span>
        <span>A</span>
      </LetterRow>
    </GridWrapper>
  );
};

export default Board;
