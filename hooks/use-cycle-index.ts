import { useRef, useState } from 'react';

export type UseCycleIndex = ReturnType<typeof useCycleIndex>;

enum Directions {
  forward = 'forward',
  backward = 'backward',
}

type Direction = keyof typeof Directions;

export function useCycleIndex(length: number) {
  const [index, setIndex] = useState(0);
  const prevIndex = useRef(index);
  const direction = useRef<Direction>(null);

  function updateIndex(nextIndex) {
    prevIndex.current = index;
    setIndex(nextIndex);
  }
  function next() {
    updateIndex((index + 1) % length);
    direction.current = Directions.forward;
  }
  function previous() {
    updateIndex((index - 1 + length) % length);
    direction.current = Directions.backward;
  }
  function goTo(i) {
    updateIndex(i);
  }

  return {
    prevIndex: prevIndex.current,
    index,
    next,
    previous,
    goTo,
  };
}
