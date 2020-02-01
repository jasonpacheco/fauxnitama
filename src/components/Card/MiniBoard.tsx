import React from 'react';
import { getIDs, coordinateToID, movesToID } from '../../utils';
import { MiniBoardWrapper, MiniBox } from './_CardStyles';

interface MiniBoardProps {
  color: string;
  moves: number[][];
}

const MiniBoard: React.FC<MiniBoardProps> = ({ color, moves }) => {
  const idsForValidMoves = movesToID(moves);
  return (
    <MiniBoardWrapper>
      {getIDs().map(({ id, x, y }) =>
        idsForValidMoves.includes(coordinateToID({ x, y })) ? (
          <MiniBox key={id} hasColor={color} />
        ) : (
          <MiniBox key={id} center={id === 12} />
        )
      )}
    </MiniBoardWrapper>
  );
};

export default React.memo(MiniBoard, (prevProps, nextProps) => {
  return (
    prevProps.color === nextProps.color && prevProps.moves === nextProps.moves
  );
});
