import { RefObject, useCallback, useEffect, useState } from 'react';
import { useDebounceCallback, useEventListener } from 'usehooks-ts';

export function useBoundingClientRect(ref: RefObject<HTMLDivElement | null>) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  const debouncedUpdateRect = useDebounceCallback(updateRect, 200);

  useEffect(() => {
    updateRect();
  }, [ref, updateRect]);

  useEventListener('resize', debouncedUpdateRect);
  useEventListener('scroll', debouncedUpdateRect);

  return rect;
}
