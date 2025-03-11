import { RefObject, useEffect, useState } from 'react';
import { useDebounceCallback, useEventListener } from 'usehooks-ts';

export function useBoundingClientRect(ref: RefObject<HTMLDivElement | null>) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  function updateRect() {
    setRect(ref.current!.getBoundingClientRect());
  }

  const debouncedUpdateRect = useDebounceCallback(updateRect, 200);

  useEffect(() => {
    setRect(ref.current!.getBoundingClientRect());
  }, [ref]);

  useEventListener('resize', debouncedUpdateRect);
  useEventListener('scroll', debouncedUpdateRect);

  return rect;
}
