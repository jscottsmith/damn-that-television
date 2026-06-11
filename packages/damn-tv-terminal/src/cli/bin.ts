import { runGame } from '../core/Game.js';
import { createNodeTerminal } from '../io/NodeTerminal.js';
import { themes } from '../core/config/themes.js';

function printHelp(): void {
  console.log(`
Damn TV — ASCII terminal shooter

Usage:
  damn-tv [options]

Options:
  --theme <name>   Color theme (${Object.keys(themes).join(', ')}) [default: club]
  --help, -h       Show this help
  --list-themes    List available themes

Controls:
  ← → / A D     Move
  Space         Shoot
  P             Pause
  Q / Ctrl+C    Quit
  Enter         Start / Retry

Play in your browser at https://damnthat.tv/damn-tv-terminal
`);
}

function parseArgs(argv: string[]): { theme?: string; help: boolean; listThemes: boolean } {
  const result = { theme: undefined as string | undefined, help: false, listThemes: false };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') result.help = true;
    if (arg === '--list-themes') result.listThemes = true;
    if (arg === '--theme' && argv[i + 1]) {
      result.theme = argv[++i];
    }
  }

  return result;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  if (args.listThemes) {
    console.log(Object.keys(themes).join('\n'));
    return;
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error('Damn TV requires an interactive terminal.');
    process.exit(1);
  }

  const terminal = createNodeTerminal();
  const controller = runGame(terminal, { theme: args.theme });

  const cleanup = () => {
    controller.destroy();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', () => {
    terminal.showCursor();
    terminal.exitAltScreen();
  });
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
