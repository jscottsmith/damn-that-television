import type { InputEvent, InputSource } from '../core/systems/input.js';
import type { DamnTvAction, DamnTvActions } from './actions.js';
import { createDamnTvActions } from './actions.js';

export const DAMN_TV_BINDINGS: Record<DamnTvAction, readonly string[]> = {
  moveLeft: ['ArrowLeft', 'KeyA'],
  moveRight: ['ArrowRight', 'KeyD'],
  fire: ['Space'],
  pause: ['KeyP'],
  quit: ['KeyQ', 'ControlC'],
  confirm: ['Enter'],
};

function isBoundHeld(source: InputSource, time: number, action: DamnTvAction): boolean {
  return DAMN_TV_BINDINGS[action].some((key) => source.isHeld(key, time));
}

function hadEdge(events: readonly InputEvent[], action: DamnTvAction): boolean {
  return events.some(
    (event) =>
      event.type === 'keydown' && DAMN_TV_BINDINGS[action].includes(event.key),
  );
}

function applyHorizontalExclusive(source: InputSource, events: readonly InputEvent[]): void {
  for (const event of events) {
    if (event.type !== 'keydown') continue;

    if (DAMN_TV_BINDINGS.moveLeft.includes(event.key)) {
      for (const key of DAMN_TV_BINDINGS.moveRight) source.clearHold(key);
    }
    if (DAMN_TV_BINDINGS.moveRight.includes(event.key)) {
      for (const key of DAMN_TV_BINDINGS.moveLeft) source.clearHold(key);
    }
  }
}

export function buildDamnTvActions(
  source: InputSource,
  events: readonly InputEvent[],
  time: number,
): DamnTvActions {
  applyHorizontalExclusive(source, events);

  const actions = createDamnTvActions();
  actions.moveLeft = isBoundHeld(source, time, 'moveLeft');
  actions.moveRight = isBoundHeld(source, time, 'moveRight');
  actions.fire = isBoundHeld(source, time, 'fire');
  actions.pause = hadEdge(events, 'pause');
  actions.quit = hadEdge(events, 'quit');
  actions.confirm = hadEdge(events, 'confirm');
  return actions;
}
