import type { Cell } from './types.js';

const EMPTY_CELL: Cell = { char: ' ', fg: 0, bg: 0 };

export class FrameBuffer {
  readonly width: number;
  readonly height: number;
  private cells: Cell[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: width * height }, () => ({ ...EMPTY_CELL }));
  }

  private index(x: number, y: number): number {
    return y * this.width + x;
  }

  get(x: number, y: number): Cell {
    return this.cells[this.index(x, y)]!;
  }

  set(x: number, y: number, cell: Partial<Cell>): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const idx = this.index(x, y);
    this.cells[idx] = { ...this.cells[idx]!, ...cell };
  }

  setBg(x: number, y: number, bg: number): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    this.cells[this.index(x, y)]!.bg = bg;
  }

  setFg(
    x: number,
    y: number,
    cell: { char: string; fg: number; bold?: boolean },
  ): void {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const idx = this.index(x, y);
    this.cells[idx] = {
      ...this.cells[idx]!,
      char: cell.char,
      fg: cell.fg,
      bold: cell.bold,
    };
  }

  fill(char: string, fg: number, bg: number): void {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = { char, fg, bg };
    }
  }

  fillRect(
    x: number,
    y: number,
    w: number,
    h: number,
    char: string,
    fg: number,
    bg: number,
  ): void {
    for (let row = y; row < y + h; row++) {
      for (let col = x; col < x + w; col++) {
        this.set(col, row, { char, fg, bg });
      }
    }
  }

  drawText(
    x: number,
    y: number,
    text: string,
    fg: number,
    bg: number,
    bold = false,
  ): void {
    for (let i = 0; i < text.length; i++) {
      this.set(x + i, y, { char: text[i]!, fg, bg, bold });
    }
  }

  drawTextCentered(
    y: number,
    text: string,
    fg: number,
    bg: number,
    bold = false,
  ): void {
    const x = Math.max(0, Math.floor((this.width - text.length) / 2));
    this.drawText(x, y, text, fg, bg, bold);
  }

  drawTextFg(
    x: number,
    y: number,
    text: string,
    fg: number,
    bold = false,
  ): void {
    for (let i = 0; i < text.length; i++) {
      this.setFg(x + i, y, { char: text[i]!, fg, bold });
    }
  }

  drawTextCenteredFg(
    y: number,
    text: string,
    fg: number,
    bold = false,
  ): void {
    const x = Math.max(0, Math.floor((this.width - text.length) / 2));
    this.drawTextFg(x, y, text, fg, bold);
  }

  drawSprite(
    x: number,
    y: number,
    lines: readonly string[],
    fg: number,
    bg: number,
    transparentChar = ' ',
  ): void {
    for (let row = 0; row < lines.length; row++) {
      const line = lines[row]!;
      for (let col = 0; col < line.length; col++) {
        const char = line[col]!;
        if (char !== transparentChar) {
          this.set(x + col, y + row, { char, fg, bg });
        }
      }
    }
  }

  drawSpriteFg(
    x: number,
    y: number,
    lines: readonly string[],
    fg: number,
    transparentChar = ' ',
    bold = false,
  ): void {
    for (let row = 0; row < lines.length; row++) {
      const line = lines[row]!;
      for (let col = 0; col < line.length; col++) {
        const char = line[col]!;
        if (char !== transparentChar) {
          this.setFg(x + col, y + row, { char, fg, bold });
        }
      }
    }
  }

  clone(): FrameBuffer {
    const copy = new FrameBuffer(this.width, this.height);
    for (let i = 0; i < this.cells.length; i++) {
      copy.cells[i] = { ...this.cells[i]! };
    }
    return copy;
  }

  forEach(callback: (cell: Cell, x: number, y: number) => void): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(this.get(x, y), x, y);
      }
    }
  }

  getCells(): readonly Cell[] {
    return this.cells;
  }
}
