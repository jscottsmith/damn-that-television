# @damnthat/damn-tv

**Damn TV** — an ASCII terminal shooter. Spiritual successor to [The Damn Game](https://damnthat.tv/the-damn-game). Kill the TVs, grab power-ups, survive the endless scroll.

Monorepo workspace package used by [damnthat.tv/damn-tv-terminal](https://damnthat.tv/damn-tv-terminal).

## Controls

| Key | Action |
| --- | --- |
| ← → or A D | Move |
| Space | Shoot |
| P | Pause |
| Q / Ctrl+C | Quit |
| Enter | Start / Retry |

## Development

From the monorepo root:

```bash
pnpm install
pnpm --filter @damnthat/damn-tv dev      # watch build
pnpm --filter @damnthat/damn-tv start    # play in terminal
pnpm --filter @damnthat/damn-tv build    # one-off build
```

The Next.js app at `apps/damnthat.tv` imports this package via `workspace:*` and embeds it with xterm.js.

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

// Node terminal
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

## Architecture

- **Core** — platform-agnostic game logic (entities, collision, levels)
- **Render** — 80×40 character framebuffer → ANSI escape output
- **IO** — `TerminalAdapter` implemented for Node stdin/stdout and xterm.js

## Character tokens

**[CHARACTER-REFERENCE.md](./src/render/sprites/CHARACTER-REFERENCE.md)**

The game viewport is fixed at 80×40 and centered in larger terminals. Margins are filled with decorative starfield art.

## License

ISC
