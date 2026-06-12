import type { FrameBuffer } from './FrameBuffer.js';
import type { Theme } from './types.js';

export interface DialogMenuItem {
  label: string;
  selected?: boolean;
  accent?: boolean;
}

export interface DialogWindowContent {
  title: string;
  bodyLines?: readonly string[];
  menuItems?: readonly DialogMenuItem[];
  footer?: string;
}

export interface DialogWindowRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const MIN_WIDTH = 40;
const PADDING_X = 2;
const PADDING_Y = 1;
const SELECTOR = '▶';

function maxLineWidth(content: DialogWindowContent): number {
  let max = content.title.length + 2;

  for (const line of content.bodyLines ?? []) {
    max = Math.max(max, line.length);
  }

  for (const item of content.menuItems ?? []) {
    max = Math.max(max, item.label.length + 2);
  }

  if (content.footer) {
    max = Math.max(max, content.footer.length);
  }

  return max;
}

export function measureDialogWindow(content: DialogWindowContent): { w: number; h: number } {
  const innerLines =
    1 +
    (content.bodyLines?.length ?? 0) +
    (content.menuItems?.length ? content.menuItems.length + 1 : 0) +
    (content.footer ? 2 : 0);

  const w = Math.max(MIN_WIDTH, maxLineWidth(content) + PADDING_X * 2);
  const h = innerLines + PADDING_Y * 2 + 2;
  return { w, h };
}

export function centerDialogInRect(
  bounds: DialogWindowRect,
  size: { w: number; h: number },
): DialogWindowRect {
  return {
    x: bounds.x + Math.floor((bounds.w - size.w) / 2),
    y: bounds.y + Math.floor((bounds.h - size.h) / 2),
    w: size.w,
    h: size.h,
  };
}

function drawBoxBorder(
  fb: FrameBuffer,
  rect: DialogWindowRect,
  theme: Theme,
): void {
  const { x, y, w, h } = rect;
  const lastX = x + w - 1;
  const lastY = y + h - 1;
  const { border, hudBg: bg } = theme;

  for (let col = x; col <= lastX; col++) {
    const corner = col === x || col === lastX;
    fb.set(col, y, { char: corner ? '█' : '▀', fg: border, bg, bold: true });
    fb.set(col, lastY, { char: corner ? '█' : '▄', fg: border, bg, bold: true });
  }

  for (let row = y + 1; row < lastY; row++) {
    fb.set(x, row, { char: '▌', fg: border, bg, bold: true });
    fb.set(lastX, row, { char: '▐', fg: border, bg, bold: true });
  }
}

function drawCenteredLine(
  fb: FrameBuffer,
  y: number,
  rect: DialogWindowRect,
  text: string,
  fg: number,
  bg: number,
  bold = false,
): void {
  const x = rect.x + Math.max(PADDING_X, Math.floor((rect.w - text.length) / 2));
  fb.drawText(x, y, text.slice(0, rect.w - PADDING_X * 2), fg, bg, bold);
}

function drawMenuRow(
  fb: FrameBuffer,
  y: number,
  rect: DialogWindowRect,
  item: DialogMenuItem,
  theme: Theme,
): void {
  const bg = theme.hudBg;
  const prefix = item.selected ? SELECTOR : ' ';
  const text = `${prefix} ${item.label}`;
  const fg = item.accent
    ? theme.danger
    : item.selected
      ? theme.title
      : theme.hudText;
  const x = rect.x + PADDING_X;
  fb.drawText(x, y, text.padEnd(rect.w - PADDING_X * 2, ' '), fg, bg, item.selected || item.accent);
}

export function drawDialogWindow(
  fb: FrameBuffer,
  rect: DialogWindowRect,
  theme: Theme,
  content: DialogWindowContent,
): void {
  const { x, y, w, h } = rect;
  const lastX = x + w - 1;
  const lastY = y + h - 1;
  const bg = theme.hudBg;
  const textFg = theme.hudText;

  fb.fillRect(x + 1, y + 1, w - 2, h - 2, ' ', textFg, bg);
  drawBoxBorder(fb, rect, theme);

  let row = y + 1 + PADDING_Y;
  drawCenteredLine(fb, row, rect, content.title, theme.borderAccent, bg, true);
  row += 1;

  for (const line of content.bodyLines ?? []) {
    drawCenteredLine(fb, row, rect, line, theme.subtitle, bg);
    row += 1;
  }

  if (content.menuItems && content.menuItems.length > 0) {
    row += 1;
    for (const item of content.menuItems) {
      drawMenuRow(fb, row, rect, item, theme);
      row += 1;
    }
  }

  if (content.footer) {
    row = lastY - PADDING_Y;
    drawCenteredLine(fb, row, rect, content.footer, theme.hudAccent, bg);
  }
}
