# ZeldDab

Phaser 4 + TypeScript + Vite scaffold. The game renders at an internal **640×480** and scales up by a whole-number factor with nearest-neighbor filtering so pixels stay crisp. Extra space is letterboxed or pillarboxed.

Move a cyan square with **arrow keys or WASD** in 8 directions (cardinals and diagonals). A yellow triangle on the square shows facing, including diagonals, and keeps pointing the last way you moved when you stop.

## Install

```bash
npm install
```

## Run

Development (hot reload):

```bash
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

Type-check only:

```bash
npm run typecheck
```

## Layout

```
index.html              # page shell, mounts the game
src/main.ts             # boots Phaser and integer scaling
src/game/constants.ts   # 640×480
src/game/config.ts      # Phaser game config
src/game/integerScale.ts
src/game/player.ts
src/game/scenes/PlayScene.ts
```
