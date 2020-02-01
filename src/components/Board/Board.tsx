import React from 'react';
import Cell from './Cell';
import { GridWrapper, Grid } from './_BoardStyles';
import {
  CellData,
  Piece,
  PlayerColor,
} from '../../interfaces/context.interface';

interface BoardProps {
  activeCell: CellData | undefined;
  activePlayer: PlayerColor;
  cells: CellData[];
  hasGameFinished: boolean;
  movement: (fromCell: CellData, toID: number) => void;
  setCell: (cell: CellData) => void;
}

const Board: React.FC<BoardProps> = ({
  activeCell,
  activePlayer,
  cells,
  hasGameFinished,
  movement,
  setCell,
}) => {
  console.log('Board rendered');
  const onCellClick = (
    cellData: CellData,
    id: number,
    isValidMove: boolean,
    piece: Piece | undefined
  ): void => {
    if (!hasGameFinished) {
      if (piece?.color === activePlayer) {
        if (!activeCell || id !== activeCell.id) {
          setCell(cellData);
        }
      }

      if (activeCell && isValidMove) {
        movement(activeCell, id);
      }
    }
  };
  return (
    <GridWrapper>
      <Grid>
        {cells.map(cell => (
          <Cell
            key={cell.id}
            activeCell={activeCell}
            activePlayer={activePlayer}
            onCellClick={onCellClick}
            renderCell={cell}
          />
        ))}
        <div id='row-1'></div>
        <div id='row-2'></div>
        <div id='row-3'></div>
        <div id='row-4'></div>
        <div id='row-5'></div>
      </Grid>
    </GridWrapper>
  );
};

// export default React.memo(Board, (prevProps, nextProps) => {
//   return isEqual(prevProps.cells, nextProps.cells);
// });

export default Board;
