import React from 'react';
import { useDrop } from 'react-dnd';
import dndTypes from '../types/dndTypes';
import { SquareWrapper, Overlay } from '../components/Board/styles/Square';
import { TEMPLE_ID_P1, TEMPLE_ID_P2 } from '../utils/constants';
import Piece from '../components/Piece/Piece';
import { connect } from 'react-redux';
import { AppState } from '../store/engine';
import { PlayerType, Colors } from '../store/engine/types/gameTypes';
import { PiecePosition, PieceTuple } from '../store/engine/types/pieceTypes';
import { idToPiece, PieceProperties } from '../store/utils';

interface OwnProps {
  handleClickSquare: (selectedSquareID: number) => void;
  squareID: number;
}

type SquareContainerProps = StateProps & OwnProps;

const SquareContainer: React.FC<SquareContainerProps> = ({
  handleClickSquare,
  squareID,
  pauseGame,
  currentPlayer,
  selectedPiece,
  validMoves,
  piece,
  colors,
}) => {
  const squareIsValidMove = validMoves.includes(squareID);
  const [{ isOver }, drop] = useDrop({
    accept: dndTypes.PIECE,
    drop: () => {
      handleClickSquare(squareID);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const getOverlayColor = (): string => {
    if (isOver) {
      return squareIsValidMove
        ? '#6c0'
        : squareID === selectedPiece[0]
        ? ''
        : '#ffcdd2';
    }
    return '';
  };

  return (
    <SquareWrapper
      highlightClickedPiece={squareID === selectedPiece[0]}
      highlightValidSquare={squareIsValidMove}
      colors={colors}
      hasTempleBackground={
        piece === undefined &&
        ((squareID === TEMPLE_ID_P1 && colors[0]) ||
          (squareID === TEMPLE_ID_P2 && colors[1]))
      }
      isActive={!pauseGame && squareIsValidMove}
      onClick={(): void => handleClickSquare(squareID)}
      ref={drop}
    >
      <Overlay color={getOverlayColor()}>
        {piece && (
          <Piece
            isActive={!pauseGame && currentPlayer === piece.color}
            isRotated={piece.color.includes(colors[0])}
            piece={piece}
            selectedPiece={selectedPiece}
            handleClickSquare={handleClickSquare}
          />
        )}
      </Overlay>
    </SquareWrapper>
  );
};

interface StateProps {
  currentPlayer: PlayerType;
  pauseGame: boolean;
  piecePositions: PiecePosition;
  selectedPiece: PieceTuple | [];
  validMoves: number[];
  piece: PieceProperties | undefined;
  colors: Colors[];
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const { piecePositions, selectedPiece, validMoves } = state.pieceReducer;
  const { currentPlayer, players, colors } = state.gameReducer.player;
  const { pauseGame } = state.gameReducer.properties;
  const squareID = ownProps.squareID;
  const piece = idToPiece(squareID, piecePositions, players);

  return {
    currentPlayer: currentPlayer as PlayerType,
    pauseGame,
    piecePositions,
    selectedPiece,
    validMoves,
    piece,
    colors,
  };
};

export default connect(mapStateToProps)(SquareContainer);
