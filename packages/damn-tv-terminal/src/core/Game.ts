import type { TerminalAdapter } from '../io/TerminalAdapter.js';
import { composeFrame } from '../render/ansi.js';
import type { Theme } from '../render/types.js';
import { DEFAULT_THEME, getTheme } from './config/themes.js';
import { InputSource } from './systems/input.js';
import { World } from './World.js';
import { ANSI, DEFAULT_CELL_ASPECT_RATIO, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '../render/types.js';
import { createViewportBuffer, renderWorld } from '../render/layers.js';
import type { DamnTvActions } from '../game/actions.js';
import { createDamnTvActions } from '../game/actions.js';
import { buildDamnTvActions } from '../game/bindings.js';

export interface GameOptions {
  theme?: string;
  targetFps?: number;
  /** Screen height ÷ width of one terminal cell. Web embed should measure. */
  cellAspectRatio?: number;
}

export interface GameController {
  pause(): void;
  resume(): void;
  destroy(): void;
  setCellAspectRatio(ratio: number): void;
}

export class Game implements GameController {
  private world = new World();
  private buffer = createViewportBuffer();
  private theme: Theme;
  private inputSource = new InputSource();
  private actions: DamnTvActions = createDamnTvActions();
  private running = false;
  private paused = false;
  private destroyed = false;
  private lastTime = 0;
  private rafId: ReturnType<typeof setInterval> | number | null = null;
  private unsubs: Array<() => void> = [];
  private targetFps: number;
  private useAnimationFrame: boolean;
  private cellAspectRatio: number;
  private themeName: string;

  constructor(
    private terminal: TerminalAdapter,
    options: GameOptions = {},
  ) {
    this.themeName = options.theme ?? DEFAULT_THEME;
    this.theme = getTheme(this.themeName);
    this.world.themeName = this.themeName;
    this.targetFps = options.targetFps ?? 60;
    this.cellAspectRatio = options.cellAspectRatio ?? DEFAULT_CELL_ASPECT_RATIO;
    this.useAnimationFrame = typeof globalThis.requestAnimationFrame === 'function';
  }

  setCellAspectRatio(ratio: number): void {
    if (ratio > 0 && Number.isFinite(ratio)) {
      this.cellAspectRatio = ratio;
    }
  }

  start(): GameController {
    this.terminal.enterAltScreen();
    this.terminal.hideCursor();
    this.terminal.write(ANSI.clear);

    this.unsubs.push(
      this.terminal.onInput((data) => this.handleInput(data)),
      this.terminal.onResize(() => this.render(this.lastTime || performance.now())),
    );

    this.running = true;
    this.lastTime = this.now();
    this.scheduleLoop();

    return this;
  }

  pause(): void {
    this.paused = true;
    if (this.world.phase === 'playing') {
      this.world.phase = 'paused';
    }
  }

  resume(): void {
    this.paused = false;
    if (this.world.phase === 'paused') {
      this.world.phase = 'playing';
    }
    this.lastTime = this.now();
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.running = false;

    if (this.rafId !== null) {
      if (this.useAnimationFrame) {
        cancelAnimationFrame(this.rafId as number);
      } else {
        clearInterval(this.rafId as ReturnType<typeof setInterval>);
      }
    }

    for (const unsub of this.unsubs) unsub();
    this.unsubs = [];

    this.terminal.showCursor();
    this.terminal.exitAltScreen();
    this.terminal.write(ANSI.reset + '\nThanks for playing Damn TV!\n');
    this.terminal.destroy();
  }

  private now(): number {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
  }

  private scheduleLoop(): void {
    if (this.useAnimationFrame) {
      const tick = (time: number) => {
        if (!this.running) return;
        this.frame(time);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    } else {
      this.rafId = setInterval(() => this.frame(this.now()), 1000 / this.targetFps);
    }
  }

  private frame(time: number): void {
    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;

    const events = this.inputSource.poll();
    this.actions = buildDamnTvActions(this.inputSource, events, time);

    if (this.actions.quit) {
      this.destroy();
      return;
    }

    if (!this.paused) {
      this.world.update(this.actions, dt, time);
      if (this.world.themeName !== this.themeName) {
        this.themeName = this.world.themeName;
        this.theme = getTheme(this.themeName);
      }
    }

    if (this.world.phase === 'menu') {
      this.paused = false;
    }

    this.render(time);
  }

  private handleInput(data: string): void {
    this.inputSource.push(data, this.now());
  }

  private render(time: number): void {
    renderWorld(this.buffer, this.world, this.theme, time, this.cellAspectRatio);
    const { cols, rows } = this.terminal.getSize();
    const output = composeFrame(
      this.buffer.getCells(),
      VIEWPORT_WIDTH,
      VIEWPORT_HEIGHT,
      cols,
      rows,
      time,
    );
    this.terminal.write(output);
  }
}

export function runGame(terminal: TerminalAdapter, options?: GameOptions): GameController {
  return new Game(terminal, options).start();
}

export { InputSource, type InputEvent } from './systems/input.js';
