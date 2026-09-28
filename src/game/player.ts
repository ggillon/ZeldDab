import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';

export const PLAYER_SIZE = 32;
export const PLAYER_SPEED = 120;

/**
 * Player square plus a yellow triangle that shows facing.
 * Facing is the last non-zero move vector (cardinal or diagonal) and stays
 * put while idle.
 */
export class Player {
  readonly container: Phaser.GameObjects.Container;
  private readonly gfx: Phaser.GameObjects.Graphics;
  facingX = 0;
  facingY = 1;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.gfx = scene.add.graphics();
    this.container = scene.add.container(x, y, [this.gfx]);
    this.container.setSize(PLAYER_SIZE, PLAYER_SIZE);
    this.redraw();
  }

  get x(): number {
    return this.container.x;
  }

  get y(): number {
    return this.container.y;
  }

  setFacing(dx: number, dy: number): void {
    this.facingX = dx;
    this.facingY = dy;
    this.redraw();
  }

  moveTo(x: number, y: number): void {
    const half = PLAYER_SIZE / 2;
    this.container.setPosition(
      Phaser.Math.Clamp(x, half, GAME_WIDTH - half),
      Phaser.Math.Clamp(y, half, GAME_HEIGHT - half),
    );
  }

  private redraw(): void {
    const half = PLAYER_SIZE / 2;
    this.gfx.clear();
    this.gfx.fillStyle(0x3de0ff);
    this.gfx.fillRect(-half, -half, PLAYER_SIZE, PLAYER_SIZE);

    const length = Math.hypot(this.facingX, this.facingY) || 1;
    const nx = this.facingX / length;
    const ny = this.facingY / length;
    const px = -ny;
    const py = nx;

    this.gfx.fillStyle(0xffcc33);
    this.gfx.fillTriangle(
      nx * 12,
      ny * 12,
      nx * -5 + px * 7,
      ny * -5 + py * 7,
      nx * -5 - px * 7,
      ny * -5 - py * 7,
    );
  }
}
