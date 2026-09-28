import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';

const SQUARE_SIZE = 32;
const SPEED_X = 140;
const SPEED_Y = 110;

export class PlayScene extends Phaser.Scene {
  private square!: Phaser.GameObjects.Rectangle;
  private velocityX = SPEED_X;
  private velocityY = SPEED_Y;

  constructor() {
    super('play');
  }

  create(): void {
    this.square = this.add.rectangle(
      80,
      80,
      SQUARE_SIZE,
      SQUARE_SIZE,
      0x3de0ff,
    );
    this.square.setOrigin(0, 0);
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    let x = this.square.x + this.velocityX * dt;
    let y = this.square.y + this.velocityY * dt;

    const maxX = GAME_WIDTH - SQUARE_SIZE;
    const maxY = GAME_HEIGHT - SQUARE_SIZE;

    if (x <= 0) {
      x = 0;
      this.velocityX = Math.abs(this.velocityX);
    } else if (x >= maxX) {
      x = maxX;
      this.velocityX = -Math.abs(this.velocityX);
    }

    if (y <= 0) {
      y = 0;
      this.velocityY = Math.abs(this.velocityY);
    } else if (y >= maxY) {
      y = maxY;
      this.velocityY = -Math.abs(this.velocityY);
    }

    this.square.setPosition(x, y);
  }
}
