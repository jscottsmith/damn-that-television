import type { TerminalAdapter, TerminalSize } from './TerminalAdapter.js';

function getStdoutSize(): TerminalSize {
  const stdout = process.stdout;
  return {
    cols: stdout.columns ?? 80,
    rows: stdout.rows ?? 24,
  };
}

export class NodeTerminal implements TerminalAdapter {
  private resizeCallbacks = new Set<(size: TerminalSize) => void>();
  private inputCallbacks = new Set<(data: string) => void>();
  private inputBuffer = '';
  private stdinListener: ((chunk: Buffer) => void) | null = null;
  private destroyed = false;

  constructor() {
    process.stdin.setEncoding('utf8');
  }

  write(data: string): void {
    process.stdout.write(data);
  }

  getSize(): TerminalSize {
    return getStdoutSize();
  }

  onResize(callback: (size: TerminalSize) => void): () => void {
    this.resizeCallbacks.add(callback);
    const handler = () => callback(getStdoutSize());
    process.stdout.on('resize', handler);
    return () => {
      this.resizeCallbacks.delete(callback);
      process.stdout.off('resize', handler);
    };
  }

  onInput(callback: (data: string) => void): () => void {
    this.inputCallbacks.add(callback);
    if (!this.stdinListener) {
      this.stdinListener = (chunk: Buffer) => {
        const str = chunk.toString('utf8');
        this.inputBuffer += str;

        while (this.inputBuffer.length > 0) {
          if (this.inputBuffer.startsWith('\x1b')) {
            const arrowMatch = /^\x1b\[[CD]/.exec(this.inputBuffer);
            if (arrowMatch) {
              this.emit(arrowMatch[0]);
              this.inputBuffer = this.inputBuffer.slice(arrowMatch[0].length);
              continue;
            }

            if (this.inputBuffer.length < 3) break;
          }

          this.emit(this.inputBuffer[0]!);
          this.inputBuffer = this.inputBuffer.slice(1);
        }
      };
      process.stdin.on('data', this.stdinListener);
      process.stdin.resume();
    }

    return () => {
      this.inputCallbacks.delete(callback);
    };
  }

  private emit(data: string): void {
    for (const cb of this.inputCallbacks) cb(data);
  }

  enterAltScreen(): void {
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    this.write('\x1b[?1049h\x1b[?25l\x1b[2J\x1b[H');
  }

  exitAltScreen(): void {
    this.write('\x1b[?1049l\x1b[?25h');
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
  }

  hideCursor(): void {
    this.write('\x1b[?25l');
  }

  showCursor(): void {
    this.write('\x1b[?25h');
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.stdinListener) {
      process.stdin.off('data', this.stdinListener);
      process.stdin.pause();
    }
    this.inputCallbacks.clear();
    this.resizeCallbacks.clear();
  }
}

export function createNodeTerminal(): NodeTerminal {
  return new NodeTerminal();
}
