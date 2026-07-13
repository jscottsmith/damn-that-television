'use client';

import { ReactNode } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@workspace/ui/components/sheet';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';

import { DEFAULT_TEXT_CLASSNAME, MAP_TITLE_SIZE_CLASSNAME, TitleSize } from './typography/title';
import { Prose } from './typography/prose';

export type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  description: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
};

export function SideDrawer(props: SideDrawerProps) {
  return (
    <Sheet
      open={props.isOpen}
      onOpenChange={(open) => {
        if (!open) props.onClose();
      }}
    >
      <SheetContent
        side="right"
        className={cn(
          surfaceVariants({ variant: 'primary' }),
          'w-full sm:max-w-2xl',
        )}
      >
        <SheetHeader className="mb-8 gap-0 p-0">
          <SheetTitle
            className={cn(
              MAP_TITLE_SIZE_CLASSNAME[TitleSize.default],
              DEFAULT_TEXT_CLASSNAME,
            )}
          >
            {props.title}
          </SheetTitle>
        </SheetHeader>
        <Prose className="flex flex-1 flex-col">
          <SheetDescription>{props.description}</SheetDescription>
          {props.body}
        </Prose>
        {props.actions ? (
          <SheetFooter className="gap-2 mt-auto flex-row p-0">
            {props.actions}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
