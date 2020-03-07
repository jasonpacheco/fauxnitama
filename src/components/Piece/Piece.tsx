import React from 'react';
import { PieceWrapper, DragSource } from './styles/Piece';
import BlueMaster from '../../assets/_blue/master.svg';
import BlueStudent from '../../assets/_blue/student.svg';
import RedMaster from '../../assets/_red/master.svg';
import RedStudent from '../../assets/_red/student.svg';
import { useDrag } from 'react-dnd';
import dndTypes from '../../types/dndTypes';
import { TEMPLE_ID_P1, TEMPLE_ID_P2 } from '../../utils/constants';
import { PieceProperties } from '../../store/utils';
import { PLAYER_BLUE } from '../../store/engine/types/gameTypes';
import { PieceTuple, MASTER } from '../../store/engine/types/pieceTypes';

interface PieceProps {
  isActive: boolean;
  isRotated: boolean;
  piece: PieceProperties;
  selectedPiece: PieceTuple | [];
  handleClickSquare: (selectedSquareID: number) => void;
}

const getPieceSVG = (type: string | undefined): string | null => {
  switch (type) {
    case 'Blue-Master':
      return BlueMaster;
    case 'Blue-Student':
      return BlueStudent;
    case 'Red-Master':
      return RedMaster;
    case 'Red-Student':
      return RedStudent;
    default:
      return null;
  }
};

const Piece: React.FC<PieceProps> = ({
  isActive,
  isRotated,
  piece,
  selectedPiece,
  handleClickSquare,
}) => {
  const { color, type, id } = piece;
  const [collectedProps, drag] = useDrag({
    item: { id, type: dndTypes.PIECE },
    begin: () => ({ id, type: dndTypes.PIECE }),
    canDrag: () => isActive,
    collect: monitor => ({
      isClickedForDrag: monitor.isDragging(),
    }),
  });

  if (collectedProps.isClickedForDrag) {
    const draggedPiece = piece;
    if (draggedPiece && selectedPiece && draggedPiece.id !== selectedPiece[0]) {
      handleClickSquare(draggedPiece.id);
    }
    return (
      <DragSource
        ref={drag}
        hasTempleBackground={
          (id === TEMPLE_ID_P1 && 'Blue') || (id === TEMPLE_ID_P2 && 'Red')
        }
      />
    );
  }

  const typeOfPiece = getPieceSVG(
    `${color === PLAYER_BLUE ? 'Blue' : 'Red'}-${
      type === MASTER ? 'Master' : 'Student'
    }`
  );
  return (
    <PieceWrapper isActive={isActive} isRotated={isRotated} ref={drag}>
      {typeOfPiece && <img src={typeOfPiece} alt={type} />}
    </PieceWrapper>
  );
};

export default React.memo(Piece);
