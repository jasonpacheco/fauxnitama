import React from 'react';
import Square from './Square';
import { GridWrapper, Grid, LetterColumn, NumberRow } from './styles/Board';
import { SquareData } from '../../interfaces/context.interface';
import useGameContext from '../../context/useGameContext';

interface BoardProps {
  setPieceClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Board: React.FC<BoardProps> = ({ setPieceClicked }) => {
  const {
    board,
    clickedPiece,
    currentPlayer,
    hasGameFinished,
    movePiece,
    pauseGame,
    setClickedPiece,
    validMoves,
  } = useGameContext();

  const onSquareClick = (clickedCellID: number): void => {
    if (!hasGameFinished && !pauseGame) {
      const piece = board[clickedCellID].piece;
      if (piece?.color === currentPlayer) {
        if (!clickedPiece || clickedCellID !== clickedPiece.currentPositionID) {
          setClickedPiece(piece);
          setPieceClicked(true);
        }
      }
      if (clickedPiece && validMoves.includes(clickedCellID)) {
        movePiece(clickedPiece, clickedCellID);
      }
    }
  };

  return (
    <GridWrapper>
      <NumberRow>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </NumberRow>
      <div style={{ display: 'flex' }}>
        <LetterColumn>
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
        </LetterColumn>
        <Grid>
          {board.map((square: SquareData) => (
            <Square
              key={square.id}
              onSquareClick={onSquareClick}
              renderedSquare={square}
            />
          ))}
        </Grid>
        <LetterColumn invert>
          <span>E</span>
          <span>D</span>
          <span>C</span>
          <span>B</span>
          <span>A</span>
        </LetterColumn>
      </div>
      <NumberRow invert>
        <span>5</span>
        <span>4</span>
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </NumberRow>
    </GridWrapper>
  );
};

export default Board;
