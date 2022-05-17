import { useState } from 'react';

export function useToggle(initialToggleState: boolean) {
  const [isToggled, setToggled] = useState<boolean>(initialToggleState);

  function setToggleState(isToggled: boolean) {
    setToggled(isToggled);
  }

  function toggleOff() {
    setToggled(false);
  }
  function toggleOn() {
    setToggled(true);
  }

  return { isToggled, setToggleState, toggleOff, toggleOn };
}
