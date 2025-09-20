import { useRef, useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';

/**
 * Hook that handles clicks outside of a given element.
 * Runs a callback when a user clicks outside of the referenced element.
 *
 * @param callback - Function to call when clicking outside
 * @param enabled - Whether the hook is enabled (default: true)
 * @returns A ref to attach to the element you want to detect clicks outside of
 */
export const useHandleClickOutside = <T extends HTMLElement = HTMLElement>(
  callback: (event: MouseEvent) => void,
  enabled: boolean = true,
) => {
  const ref = useRef<T>(null);
  const documentRef = useRef<Document>(document);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  useEventListener('mousedown', handleClickOutside, documentRef, enabled);

  return ref;
};
