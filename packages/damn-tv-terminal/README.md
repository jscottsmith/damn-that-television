# @damnthat/damn-tv

**Damn TV** — an ASCII terminal shooter. Spiritual successor to [The Damn Game](https://damnthat.tv/the-damn-game). Kill the TVs, grab power-ups, survive the endless scroll.

Play in your terminal or embed in the browser with [xterm.js](https://xtermjs.org/).

## Quick start

```bash
npx @damnthat/damn-tv
```

With a color theme:

```bash
npx @damnthat/damn-tv --theme neon
npx @damnthat/damn-tv --theme retro
npx @damnthat/damn-tv --theme club   # default
```

## Controls

| Key | Action |
| --- | --- |
| ← → or A D | Move |
| Space | Shoot |
| P | Pause |
| Q / Ctrl+C | Quit |
| Enter | Start / Retry |

## Play in the browser

Visit [damnthat.tv/damn-tv-terminal](https://damnthat.tv/damn-tv-terminal).

## Embed in your app

```bash
npm install @damnthat/damn-tv @xterm/xterm @xterm/addon-fit
```

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { runGame, XtermTerminal } from '@damnthat/damn-tv';
import '@xterm/xterm/css/xterm.css';

export function DamnTvGame() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = new Terminal({ cursorBlink: false });
    const fit = new FitAddon();
    terminal.loadAddon(fit);
    terminal.open(ref.current!);
    fit.fit();

    const controller = runGame(new XtermTerminal(terminal), { theme: 'club' });

    return () => {
      controller.destroy();
      terminal.dispose();
    };
  }, []);

  return <div ref={ref} style={{ height: 480 }} />;
}
```

## API

```typescript
import {
  runGame,
  createNodeTerminal,
  XtermTerminal,
  themes,
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
} from '@damnthat/damn-tv';

// CLI / Node
const terminal = createNodeTerminal();
const controller = runGame(terminal, { theme: 'club', targetFps: 30 });

controller.pause();
controller.resume();
controller.destroy();
```

### `GameOptions`

| Option | Default | Description |
| --- | --- | --- |
| `theme` | `'club'` | Color theme name (`club`, `retro`, `neon`) |
| `targetFps` | `30` | Target frame rate (Node CLI) |

## Development

From the monorepo root:

```bash
pnpm install
pnpm --filter @damnthat/damn-tv build
pnpm --filter @damnthat/damn-tv start   # play locally
```

## Architecture

- **Core** — platform-agnostic game logic (entities, collision, levels)
- **Render** — 80×40 character framebuffer → ANSI escape output
- **IO** — `TerminalAdapter` implemented for Node stdin/stdout and xterm.js

## Character tokens

**[CHARACTER-REFERENCE.md](./src/render/sprites/CHARACTER-REFERENCE.md)**

The game viewport is fixed at 80×40 and centered in larger terminals. Margins are filled with decorative starfield art.

## Publish to npm

```bash
cd packages/damn-tv-terminal
pnpm build
npm publish --access public
```

Requires an npm account with access to the `@damnthat` scope.

## License

ISC
