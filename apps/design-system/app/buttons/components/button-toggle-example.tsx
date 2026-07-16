import {
  ButtonToggle,
  type ButtonToggleProps,
} from '@workspace/ui/components/button-toggle';
import { useState } from 'react';

export function ButtonToggleExample(
  props: Omit<ButtonToggleProps, 'isSelected'>,
) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ButtonToggle
      isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
      {...props}
    >
      {props.children}
    </ButtonToggle>
  );
}
