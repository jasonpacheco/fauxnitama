import React from 'react';
import { MoveToken } from './_ModalStyles';

interface MoveHistoryModalProps {
  moveHistory: string[][];
}

const MoveHistoryModal: React.FC<MoveHistoryModalProps> = ({ moveHistory }) => {
  return (
    <div>
      <p>
        {moveHistory.map((move, index) => {
          const captChar = move[2].charAt(0);
          const captPiece = move[2].slice(1);
          return (
            <React.Fragment key={index}>
              <MoveToken
                color={move[0].startsWith('B') ? '#1976D2' : '#D32F2F'}
              >
                {move[0]}
              </MoveToken>
              <MoveToken>{move[1]}</MoveToken>
              <MoveToken bold>{captChar}</MoveToken>
              <MoveToken
                color={captPiece.startsWith('B') ? '#1976D2' : '#D32F2F'}
              >
                {captPiece}
              </MoveToken>
              <MoveToken color={'green'}>{move[3]}</MoveToken>
              <br />
            </React.Fragment>
          );
        })}
      </p>
    </div>
  );
};

export default React.memo(MoveHistoryModal, (prevProps, nextProps) => {
  return prevProps.moveHistory.length === nextProps.moveHistory.length;
});
