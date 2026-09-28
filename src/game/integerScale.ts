import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';

/**
 * Largest integer zoom that keeps the 640×480 canvas inside the parent.
 * Remaining space is letterboxed / pillarboxed by the centered parent.
 */
export function integerScaleFactor(
  parentWidth: number,
  parentHeight: number,
): number {
  const x = Math.floor(parentWidth / GAME_WIDTH);
  const y = Math.floor(parentHeight / GAME_HEIGHT);
  return Math.max(1, Math.min(x, y));
}

export function applyIntegerScale(game: Phaser.Game): number {
  const parent = game.scale.parent ?? document.getElementById('game');
  if (!parent || !game.canvas) {
    return 1;
  }

  const scale = integerScaleFactor(parent.clientWidth, parent.clientHeight);
  // Scale.NONE + setZoom keeps the canvas buffer at 640×480 and sizes CSS
  // by an integer factor, so pointer mapping stays aligned with the display.
  game.scale.setZoom(scale);
  game.canvas.style.imageRendering = 'pixelated';
  return scale;
}
