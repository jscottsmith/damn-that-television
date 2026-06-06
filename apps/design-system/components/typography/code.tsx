import clsx from 'clsx';
import React from 'react';
import { SlotComponent, SlotComponentProps } from '../slot';
import { SHARED_TEXT_CLASSNAME } from './constants';

const DEFAULT_CODE_STYLE = clsx('font-mono', SHARED_TEXT_CLASSNAME);

export function Code(props: SlotComponentProps) {
  return (
    <SlotComponent className={DEFAULT_CODE_STYLE}>
      {props.children}
    </SlotComponent>
  );
}
