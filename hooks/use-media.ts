import { useMediaQuery } from 'usehooks-ts';

export function useIsTouch() {
  return useMediaQuery('(hover: none)');
}

export function useIsNotTouch() {
  return !useIsTouch();
}
