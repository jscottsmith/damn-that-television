import { RefObject, useEffect, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

export function useBoundingClientRect(ref: RefObject<HTMLDivElement | null>) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    setRect(ref.current!.getBoundingClientRect());
  }, [ref]);

  useEventListener('resize', () => {
    setRect(ref.current!.getBoundingClientRect());
  });

  return rect;
}
