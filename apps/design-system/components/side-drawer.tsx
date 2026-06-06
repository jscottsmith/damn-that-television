import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { AnimateFadeIn } from './animations/animate-fade-in';
import { CardPadding } from './card';
import { Title } from './typography/title';
import { Prose } from './typography/prose';
import BackdropOverlay from './backdrop-overlay';

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
    <AnimatePresence initial={false}>
      {props.isOpen && (
        <Dialog
          static
          className="relative z-50"
          open={props.isOpen}
          onClose={() => props.onClose()}
        >
          <AnimateFadeIn key="background">
            <BackdropOverlay />
          </AnimateFadeIn>

          <div className="pl-base fixed inset-0 flex h-screen w-screen justify-end overflow-hidden">
            <CardPadding asChild>
              <motion.div
                key="panel"
                className={cn(
                  surfaceVariants({ variant: 'primary' }),
                  'z-10 flex min-h-full w-full max-w-2xl',
                )}
                initial={{ x: '100%', opacity: 1 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{ x: '100%', opacity: 1 }}
              >
                <Dialog.Panel className="py-xl flex flex-col justify-center">
                  <header className="mb-xl flex items-center justify-between">
                    <Dialog.Title>
                      <Title asChild>
                        <span>{props.title}</span>
                      </Title>
                    </Dialog.Title>
                    <Button presentation="icon" onClick={() => props.onClose()}>
                      <XMarkIcon />
                    </Button>
                  </header>
                  <Prose>
                    <Dialog.Description>{props.description}</Dialog.Description>
                    {props.body}
                  </Prose>
                  <footer className="gap-sm mt-auto flex w-full">
                    {props.actions}
                  </footer>
                </Dialog.Panel>
              </motion.div>
            </CardPadding>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
