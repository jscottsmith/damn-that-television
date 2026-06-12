export type InputEventType = 'keydown' | 'keyup';

export interface InputEvent {
  type: InputEventType;
  key: string;
  raw: string;
}

/** Map terminal bytes to normalized key ids. Returns null for unrecognized input. */
export function normalizeKey(raw: string): string | null {
  switch (raw) {
    case '\x1b[D':
      return 'ArrowLeft';
    case '\x1b[C':
      return 'ArrowRight';
    case '\x1b[A':
      return 'ArrowUp';
    case '\x1b[B':
      return 'ArrowDown';
    case ' ':
      return 'Space';
    case 'a':
    case 'A':
      return 'KeyA';
    case 'd':
    case 'D':
      return 'KeyD';
    case 'w':
    case 'W':
      return 'KeyW';
    case 's':
    case 'S':
      return 'KeyS';
    case 'p':
    case 'P':
      return 'KeyP';
    case 'q':
    case 'Q':
      return 'KeyQ';
    case '\x1b':
      return 'Escape';
    case '\x03':
      return 'ControlC';
    case '\r':
    case '\n':
      return 'Enter';
    default:
      return null;
  }
}

export function parseInputChunk(data: string, type: InputEventType = 'keydown'): InputEvent[] {
  const events: InputEvent[] = [];

  if (data.length > 1 && data.startsWith('\x1b')) {
    const key = normalizeKey(data);
    if (key) events.push({ type, key, raw: data });
    return events;
  }

  for (const char of data) {
    const key = normalizeKey(char);
    if (key) events.push({ type, key, raw: char });
  }

  return events;
}

export interface InputSourceOptions {
  /** Synthetic key-up delay for terminals that do not emit keyup. */
  holdMs?: number;
}

export class InputSource {
  private readonly holdMs: number;
  private readonly heldUntil = new Map<string, number>();
  private queue: InputEvent[] = [];
  private listeners = new Set<(event: InputEvent) => void>();

  constructor(options: InputSourceOptions = {}) {
    this.holdMs = options.holdMs ?? 120;
  }

  on(listener: (event: InputEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  push(data: string, time: number, type: InputEventType = 'keydown'): void {
    for (const event of parseInputChunk(data, type)) {
      this.queue.push(event);

      if (event.type === 'keydown') {
        this.heldUntil.set(event.key, time + this.holdMs);
      } else {
        this.heldUntil.delete(event.key);
      }

      for (const listener of this.listeners) listener(event);
    }
  }

  poll(): readonly InputEvent[] {
    const events = this.queue;
    this.queue = [];
    return events;
  }

  isHeld(key: string, time: number): boolean {
    return (this.heldUntil.get(key) ?? 0) > time;
  }

  clearHold(key: string): void {
    this.heldUntil.delete(key);
  }

  extendHold(key: string, time: number): void {
    this.heldUntil.set(key, time + this.holdMs);
  }
}
