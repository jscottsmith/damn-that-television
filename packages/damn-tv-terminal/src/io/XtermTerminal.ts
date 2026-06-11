import type { TerminalAdapter, TerminalSize } from './TerminalAdapter.js';

/** Minimal xterm.js Terminal surface — avoids hard dependency at runtime in Node. */
export interface XtermLike {
  cols: number;
  rows: number;
  write(data: string): void;
  onData(callback: (data: string) => void): { dispose(): void };
  onResize(callback: (size: { cols: number; rows: number }) => void): { dispose(): void };
  options: { cursorBlink?: boolean };
  loadAddon?(addon: unknown): void;
}

export class XtermTerminal implements TerminalAdapter {
  private dataDisposable: { dispose(): void } | null = null;
  private resizeDisposable: { dispose(): void } | null = null;
  private destroyed = false;

  constructor(private terminal: XtermLike) {}

  write(data: string): void {
    this.terminal.write(data);
  }

  getSize(): TerminalSize {
    return { cols: this.terminal.cols, rows: this.terminal.rows };
  }

  onResize(callback: (size: TerminalSize) => void): () => void {
    this.resizeDisposable = this.terminal.onResize(({ cols, rows }) => {
      callback({ cols, rows });
    });
    return () => this.resizeDisposable?.dispose();
  }

  onInput(callback: (data: string) => void): () => void {
    this.dataDisposable = this.terminal.onData(callback);
    return () => this.dataDisposable?.dispose();
  }

  enterAltScreen(): void {
    this.terminal.options.cursorBlink = false;
    this.write('\x1b[?1049h\x1b[?25l\x1b[2J\x1b[H');
  }

  exitAltScreen(): void {
    this.write('\x1b[?1049l\x1b[?25h');
    this.terminal.options.cursorBlink = true;
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
    this.dataDisposable?.dispose();
    this.resizeDisposable?.dispose();
  }
}
