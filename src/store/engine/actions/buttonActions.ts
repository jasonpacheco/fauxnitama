import {
  OnClickButtonNoRestart,
  ON_CLICK_BUTTON_NO_RESTART,
  ON_CLICK_BUTTON_YES_RESTART,
  ON_CLICK_BUTTON_PASS,
  OnClickButtonPause,
  ON_CLICK_BUTTON_PAUSE,
  OnClickButtonPrompt,
  ON_CLICK_BUTTON_PROMPT,
} from '../types/buttonTypes';
import { generateRandomCards } from '../../utils';
import { cardNameToCard } from '../../../utils';
import {
  PLAYER_RED,
  PLAYER_BLUE,
  PLAYER_AI,
  PlayerType,
} from '../types/gameTypes';
import { ThunkResult } from '..';
import { moveNotation } from '../../../interactive/notation';
import { getFEN } from '../../../interactive/getFEN';

export const onClickButtonNoRestart = (): OnClickButtonNoRestart => ({
  type: ON_CLICK_BUTTON_NO_RESTART,
});

export const onClickButtonYesRestart = (): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const { players } = getState().gameReducer.player;
  const newCards = generateRandomCards();
  const firstPlayerColor = cardNameToCard(newCards[4]).stamp;
  const firstPlayer = firstPlayerColor === 'Blue' ? PLAYER_BLUE : PLAYER_RED;

  const index = players.indexOf(firstPlayer);

  dispatch({
    type: ON_CLICK_BUTTON_YES_RESTART,
    cards: newCards,
    currentPlayer: index === -1 ? PLAYER_AI : firstPlayer,
    players,
  });
};

export const onClickButtonPass = (): ThunkResult<void> => (
  dispatch,
  getState
): void => {
  const {
    cardReducer: { selectedCardName },
    gameReducer: {
      player: { currentPlayer, colors, players },
    },
  } = getState();
  if (!selectedCardName) {
    return;
  }

  const playerColor = currentPlayer.includes(colors[0]) ? colors[0] : colors[1];
  const [didPass, didCapture] = [true, false];
  const move = moveNotation(playerColor, didPass, didCapture, selectedCardName);
  const opponent = currentPlayer === players[0] ? players[1] : players[0];

  dispatch({
    type: ON_CLICK_BUTTON_PASS,
    move,
    currentPlayer: opponent,
  });
};

export const onClickButtonPause = (): OnClickButtonPause => ({
  type: ON_CLICK_BUTTON_PAUSE,
});

export const onClickButtonPrompt = (): OnClickButtonPrompt => ({
  type: ON_CLICK_BUTTON_PROMPT,
});

export const onClickButtonFEN = (): ThunkResult<string> => (
  dispatch,
  getState
): string => {
  const {
    cardReducer: { cards },
    gameReducer: {
      player: { currentPlayer, colors, players },
    },
    pieceReducer: { piecePositions },
  } = getState();
  const fen = getFEN(
    piecePositions,
    players,
    cards,
    currentPlayer as PlayerType,
    colors
  );

  return fen;
};
