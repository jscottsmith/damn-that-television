import type { Ref, RefCallback } from 'react';

/**
 * Merges multiple React refs (callback or object) into a single callback ref.
 * Useful when a component needs to forward its ref while also using its own.
 */
export function mergeRef<T>(
  ...refs: Array<Ref<T> | null | undefined>
): RefCallback<T> {
  return (instance: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(instance);
        continue;
      }
      try {
        (ref as { current: T | null }).current = instance;
      } catch {
        // noop: in case a read-only RefObject is passed, ignore assignment
      }
    }
  };
}
