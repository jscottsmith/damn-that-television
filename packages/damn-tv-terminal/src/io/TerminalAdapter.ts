export interface TerminalSize {
  cols: number;
  rows: number;
}

export interface TerminalAdapter {
  write(data: string): void;
  getSize(): TerminalSize;
  onResize(callback: (size: TerminalSize) => void): () => void;
  onInput(callback: (data: string) => void): () => void;
  enterAltScreen(): void;
  exitAltScreen(): void;
  hideCursor(): void;
  showCursor(): void;
  destroy(): void;
}
