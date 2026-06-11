import type { InputEvent, InputSource } from '../core/systems/input.js';
import type { DamnTvAction, DamnTvActions } from './actions.js';
import { createDamnTvActions } from './actions.js';

export const DAMN_TV_BINDINGS: Record<DamnTvAction, readonly string[]> = {
  moveLeft: ['ArrowLeft', 'KeyA'],
  moveRight: ['ArrowRight', 'KeyD'],
  moveUp: ['ArrowUp', 'KeyW'],
  moveDown: ['ArrowDown', 'KeyS'],
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

function applyAxisExclusive(
  source: InputSource,
  events: readonly InputEvent[],
  left: DamnTvAction,
  right: DamnTvAction,
): void {
  for (const event of events) {
    if (event.type !== 'keydown') continue;

    if (DAMN_TV_BINDINGS[left].includes(event.key)) {
      for (const key of DAMN_TV_BINDINGS[right]) source.clearHold(key);
    }
    if (DAMN_TV_BINDINGS[right].includes(event.key)) {
      for (const key of DAMN_TV_BINDINGS[left]) source.clearHold(key);
    }
  }
}

export function buildDamnTvActions(
  source: InputSource,
  events: readonly InputEvent[],
  time: number,
): DamnTvActions {
  applyAxisExclusive(source, events, 'moveLeft', 'moveRight');
  applyAxisExclusive(source, events, 'moveUp', 'moveDown');

  const actions = createDamnTvActions();
  actions.moveLeft = isBoundHeld(source, time, 'moveLeft');
  actions.moveRight = isBoundHeld(source, time, 'moveRight');
  actions.moveUp = isBoundHeld(source, time, 'moveUp');
  actions.moveDown = isBoundHeld(source, time, 'moveDown');
  actions.fire = isBoundHeld(source, time, 'fire');
  actions.pause = hadEdge(events, 'pause');
  actions.quit = hadEdge(events, 'quit');
  actions.confirm = hadEdge(events, 'confirm');
  return actions;
}
