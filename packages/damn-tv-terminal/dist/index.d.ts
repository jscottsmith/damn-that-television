interface TerminalSize {
    cols: number;
    rows: number;
}
interface TerminalAdapter {
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

type InputEventType = 'keydown' | 'keyup';
interface InputEvent {
    type: InputEventType;
    key: string;
    raw: string;
}
interface InputSourceOptions {
    /** Synthetic key-up delay for terminals that do not emit keyup. */
    holdMs?: number;
}
declare class InputSource {
    private readonly holdMs;
    private readonly heldUntil;
    private queue;
    private listeners;
    constructor(options?: InputSourceOptions);
    on(listener: (event: InputEvent) => void): () => void;
    push(data: string, time: number, type?: InputEventType): void;
    poll(): readonly InputEvent[];
    isHeld(key: string, time: number): boolean;
    clearHold(key: string): void;
    extendHold(key: string, time: number): void;
}

interface GameOptions {
    theme?: string;
    targetFps?: number;
}
interface GameController {
    pause(): void;
    resume(): void;
    destroy(): void;
}
declare function runGame(terminal: TerminalAdapter, options?: GameOptions): GameController;

declare class NodeTerminal implements TerminalAdapter {
    private resizeCallbacks;
    private inputCallbacks;
    private inputBuffer;
    private stdinListener;
    private destroyed;
    constructor();
    write(data: string): void;
    getSize(): TerminalSize;
    onResize(callback: (size: TerminalSize) => void): () => void;
    onInput(callback: (data: string) => void): () => void;
    private emit;
    enterAltScreen(): void;
    exitAltScreen(): void;
    hideCursor(): void;
    showCursor(): void;
    destroy(): void;
}
declare function createNodeTerminal(): NodeTerminal;

/** Minimal xterm.js Terminal surface — avoids hard dependency at runtime in Node. */
interface XtermLike {
    cols: number;
    rows: number;
    write(data: string): void;
    onData(callback: (data: string) => void): {
        dispose(): void;
    };
    onResize(callback: (size: {
        cols: number;
        rows: number;
    }) => void): {
        dispose(): void;
    };
    options: {
        cursorBlink?: boolean;
    };
    loadAddon?(addon: unknown): void;
}
declare class XtermTerminal implements TerminalAdapter {
    private terminal;
    private dataDisposable;
    private resizeDisposable;
    private destroyed;
    constructor(terminal: XtermLike);
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

interface Theme {
    name: string;
    background: number;
    border: number;
    borderAccent: number;
    playfieldBg: number;
    playfieldStars: number;
    hudBg: number;
    hudText: number;
    hudAccent: number;
    player: number;
    playerBullet: number;
    enemy: number;
    enemyAccent: number;
    powerUp: number;
    explosion: number;
    title: number;
    subtitle: number;
    danger: number;
}
declare const VIEWPORT_WIDTH = 80;
declare const VIEWPORT_HEIGHT = 40;
declare const PLAYFIELD_WIDTH = 76;
declare const PLAYFIELD_HEIGHT = 34;

declare const themes: Record<string, Theme>;
declare function getTheme(name?: string): Theme;
declare const DEFAULT_THEME = "club";

export { DEFAULT_THEME, type GameController, type GameOptions, type InputEvent, InputSource, NodeTerminal, PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH, type TerminalAdapter, type TerminalSize, type Theme, VIEWPORT_HEIGHT, VIEWPORT_WIDTH, type XtermLike, XtermTerminal, createNodeTerminal, getTheme, runGame, themes };
