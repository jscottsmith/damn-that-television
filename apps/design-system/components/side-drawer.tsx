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

import { Prose } from '@workspace/ui/components/typography/prose';
import { titleVariants } from '@workspace/ui/components/typography/title';

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
          <SheetTitle className={cn(titleVariants({ size: 'default' }))}>
            {props.title}
          </SheetTitle>
        </SheetHeader>
        <Prose className="flex flex-1 flex-col">
          <SheetDescription>{props.description}</SheetDescription>
          {props.body}
        </Prose>
        {props.actions ? (
          <SheetFooter className="mt-auto flex-row gap-2 p-0">
            {props.actions}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
