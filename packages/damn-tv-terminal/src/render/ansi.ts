import type { Cell } from "./types.js";
import { backgroundBlock } from "./backgroundPattern.js";

const EMPTY: Cell = { char: " ", fg: 252, bg: 233 };

function fgCode(color: number): string {
  if (color >= 0 && color <= 7) return `\x1b[3${color}m`;
  if (color >= 8 && color <= 15) return `\x1b[9${color - 8}m`;
  return `\x1b[38;5;${color}m`;
}

function bgCode(color: number): string {
  if (color >= 0 && color <= 7) return `\x1b[4${color}m`;
  if (color >= 8 && color <= 15) return `\x1b[10${color - 8}m`;
  return `\x1b[48;5;${color}m`;
}

function styleFor(cell: Cell, prev: Cell | null): string {
  if (
    prev &&
    prev.fg === cell.fg &&
    prev.bg === cell.bg &&
    !!prev.bold === !!cell.bold
  ) {
    return "";
  }

  const parts = ["\x1b[0m"];
  if (cell.bold) parts.push("\x1b[1m");
  parts.push(fgCode(cell.fg), bgCode(cell.bg));
  return parts.join("");
}

function marginCell(x: number, y: number): Cell {
  return {
    char: backgroundBlock(x, y),
    fg: 236,
    bg: 233,
  };
}

function cellAt(
  termX: number,
  termY: number,
  viewportCells: readonly Cell[],
  viewportWidth: number,
  viewportHeight: number,
  offsetX: number,
  offsetY: number
): Cell {
  const localX = termX - offsetX;
  const localY = termY - offsetY;

  if (
    localX >= 0 &&
    localX < viewportWidth &&
    localY >= 0 &&
    localY < viewportHeight
  ) {
    return viewportCells[localY * viewportWidth + localX] ?? EMPTY;
  }

  return marginCell(termX, termY);
}

/** Render the full terminal in one pass — viewport centered, margins filled. */
export function composeFrame(
  viewportCells: readonly Cell[],
  viewportWidth: number,
  viewportHeight: number,
  termCols: number,
  termRows: number,
  frameTime: number
): string {
  const offsetX = Math.max(0, Math.floor((termCols - viewportWidth) / 2));
  const offsetY = Math.max(0, Math.floor((termRows - viewportHeight) / 2));
  const chunks: string[] = [];

  for (let ty = 0; ty < termRows; ty++) {
    chunks.push(`\x1b[${ty + 1};1H`);
    let prev: Cell | null = null;

    for (let tx = 0; tx < termCols; tx++) {
      const cell = cellAt(
        tx,
        ty,
        viewportCells,
        viewportWidth,
        viewportHeight,
        offsetX,
        offsetY
      );
      chunks.push(styleFor(cell, prev));
      chunks.push(cell.char);
      prev = cell;
    }
  }

  chunks.push("\x1b[0m");
  return chunks.join("");
}

// Kept for tests / direct viewport rendering
export function frameToAnsi(
  cells: readonly Cell[],
  width: number,
  height: number,
  offsetX = 0,
  offsetY = 0
): string {
  const chunks: string[] = [];
  let prev: Cell | null = null;

  for (let y = 0; y < height; y++) {
    chunks.push(`\x1b[${offsetY + y + 1};${offsetX + 1}H`);
    prev = null;

    for (let x = 0; x < width; x++) {
      const cell = cells[y * width + x]!;
      chunks.push(styleFor(cell, prev));
      chunks.push(cell.char);
      prev = cell;
    }
  }

  chunks.push("\x1b[0m");
  return chunks.join("");
}
