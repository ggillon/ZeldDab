import Phaser from 'phaser';
import { createGameConfig } from './game/config';
import { applyIntegerScale } from './game/integerScale';
import './style.css';

const game = new Phaser.Game(createGameConfig());

const resize = (): void => {
  applyIntegerScale(game);
};

game.events.once(Phaser.Core.Events.READY, resize);
window.addEventListener('resize', resize);
