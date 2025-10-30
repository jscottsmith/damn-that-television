import {
  SelectionButton,
  SelectionButtonProps,
} from '@/components/buttons/selection-button';
import React, { useState } from 'react';

export function SelectionButtonExample(
  props: Omit<SelectionButtonProps, 'isSelected'>,
) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SelectionButton
      isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
      {...props}
    >
      {props.children}
    </SelectionButton>
  );
}
