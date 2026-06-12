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
const MENU_PAD_X = 1;
const ARROW_GAP = 1;
const SELECTOR = '▶';

function getMenuRowBounds(rect: DialogWindowRect): {
  left: number;
  right: number;
  width: number;
  labelStart: number;
  labelWidth: number;
} {
  const left = rect.x + PADDING_X + MENU_PAD_X;
  const right = rect.x + rect.w - PADDING_X - MENU_PAD_X - 1;
  const width = right - left + 1;
  const labelStart = left + 1 + ARROW_GAP;
  const labelWidth = right - labelStart + 1;

  return { left, right, width, labelStart, labelWidth };
}

function maxLineWidth(content: DialogWindowContent): number {
  let max = content.title.length + 2;

  for (const line of content.bodyLines ?? []) {
    max = Math.max(max, line.length);
  }

  for (const item of content.menuItems ?? []) {
    max = Math.max(max, 1 + ARROW_GAP + item.label.length + MENU_PAD_X * 2);
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
  const { left, labelStart, labelWidth } = getMenuRowBounds(rect);
  const normalFg = item.accent ? theme.danger : theme.hudText;
  const normalBg = theme.hudBg;
  const arrowChar = item.selected ? SELECTOR : ' ';

  fb.set(left, y, { char: arrowChar, fg: normalFg, bg: normalBg });
  fb.set(left + 1, y, { char: ' ', fg: normalFg, bg: normalBg });

  const label = item.label.slice(0, labelWidth);

  if (item.selected) {
    const fg = normalBg;
    const bg = normalFg;
    fb.fillRect(labelStart, y, labelWidth, 1, ' ', fg, bg);
    fb.drawText(labelStart, y, label, fg, bg);
    return;
  }

  fb.fillRect(labelStart, y, labelWidth, 1, ' ', normalFg, normalBg);
  fb.drawText(labelStart, y, label, normalFg, normalBg, item.accent ?? false);
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
