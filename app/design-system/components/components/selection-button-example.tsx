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
      size={props.size}
      isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
    >
      {props.children}
    </SelectionButton>
  );
}
