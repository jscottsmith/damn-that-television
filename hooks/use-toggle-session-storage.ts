import {
  addToSessionStorage,
  getFromSessionStorage,
} from '@/helpers/session-storage';
import { useState } from 'react';

export function useToggleSessionStorage(key: string) {
  const sessionToggleState = getFromSessionStorage(key);

  const [isToggled, setToggled] = useState<boolean>(sessionToggleState);

  function setToggleState(isToggled: boolean) {
    addToSessionStorage(key, isToggled);
    setToggled(isToggled);
  }

  return { isToggled, setToggleState };
}
