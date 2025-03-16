import { useState } from "react";

export function useCycleIndex(length: number) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % length);
  const previous = () => setIndex((index - 1 + length) % length);

  return {
    index,
    next,
    previous,
  };
}
