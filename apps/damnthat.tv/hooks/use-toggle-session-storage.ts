import { useIsMounted, useSessionStorage } from 'usehooks-ts';

export function useToggleSessionStorage(key: string, initialValue?: string) {
  const [value, setValue, removeValue] = useSessionStorage(key, initialValue);

  const isMounted = useIsMounted();
  function toggle() {
    if (value) {
      removeValue();
    } else {
      setValue('true');
    }
  }

  return { isToggled: isMounted() ? !!value : initialValue, toggle };
}
