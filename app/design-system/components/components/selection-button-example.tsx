import { SelectionButton } from '@/components/selection-button';
import React, { PropsWithChildren, useState } from 'react';

export function SelectionButtonExample(props: PropsWithChildren) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SelectionButton
      isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
    >
      {props.children}
    </SelectionButton>
  );
}
