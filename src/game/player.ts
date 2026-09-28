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
  private readonly facingMarker: Phaser.GameObjects.Triangle;
  facingX = 0;
  facingY = 1;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const body = scene.add.rectangle(0, 0, PLAYER_SIZE, PLAYER_SIZE, 0x3de0ff);
    body.setOrigin(0.5, 0.5);

    // Tip points east at angle 0 so setAngle(atan2(y, x)) matches facing.
    this.facingMarker = scene.add.triangle(
      0,
      0,
      12,
      0,
      -6,
      -8,
      -6,
      8,
      0xffcc33,
    );

    this.container = scene.add.container(x, y, [body, this.facingMarker]);
    this.container.setSize(PLAYER_SIZE, PLAYER_SIZE);
    this.applyFacing();
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
    this.applyFacing();
  }

  moveTo(x: number, y: number): void {
    const half = PLAYER_SIZE / 2;
    this.container.setPosition(
      Phaser.Math.Clamp(x, half, GAME_WIDTH - half),
      Phaser.Math.Clamp(y, half, GAME_HEIGHT - half),
    );
  }

  private applyFacing(): void {
    this.facingMarker.setAngle(
      Phaser.Math.RadToDeg(Math.atan2(this.facingY, this.facingX)),
    );
  }
}
