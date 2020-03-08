import isEqual from 'lodash.isequal';
import React from 'react';

import { MiniBoardWrapper, MiniCell } from './styles/MiniBoard';

interface MiniBoardProps {
  board: string[][];
  color: string;
}

const MiniBoard: React.FC<MiniBoardProps> = ({ board, color }) => {
  return (
    <MiniBoardWrapper>
      {board.map((row: string[], rowIndex) =>
        row.map((value, colIndex) => (
          <MiniCell
            key={5 * rowIndex + colIndex}
            moveColor={color}
            value={value}
          />
        ))
      )}
    </MiniBoardWrapper>
  );
};

export default React.memo(MiniBoard, (prevProps, nextProps) => {
  return (
    prevProps.color === nextProps.color &&
    isEqual(prevProps.board, nextProps.board)
  );
});
