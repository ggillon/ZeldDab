import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';
import { Player, PLAYER_SPEED } from '../player';

type WasdKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

export class PlayScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: WasdKeys;

  constructor() {
    super('play');
  }

  create(): void {
    this.player = new Player(this, GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const keyboard = this.input.keyboard;
    if (!keyboard) {
      throw new Error('Keyboard plugin is required for player movement');
    }

    this.cursors = keyboard.createCursorKeys();
    this.wasd = keyboard.addKeys('W,A,S,D') as WasdKeys;
    keyboard.addCapture([
      Phaser.Input.Keyboard.KeyCodes.W,
      Phaser.Input.Keyboard.KeyCodes.A,
      Phaser.Input.Keyboard.KeyCodes.S,
      Phaser.Input.Keyboard.KeyCodes.D,
      Phaser.Input.Keyboard.KeyCodes.UP,
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    ]);

    this.game.canvas.setAttribute('tabindex', '0');
    this.game.canvas.focus();
  }

  update(_time: number, delta: number): void {
    let dx = 0;
    let dy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      dx -= 1;
    }
    if (this.cursors.right.isDown || this.wasd.D.isDown) {
      dx += 1;
    }
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      dy -= 1;
    }
    if (this.cursors.down.isDown || this.wasd.S.isDown) {
      dy += 1;
    }

    if (dx === 0 && dy === 0) {
      return;
    }

    this.player.setFacing(dx, dy);

    const length = Math.hypot(dx, dy);
    const dt = delta / 1000;
    this.player.moveTo(
      this.player.x + (dx / length) * PLAYER_SPEED * dt,
      this.player.y + (dy / length) * PLAYER_SPEED * dt,
    );
  }
}
