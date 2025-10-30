import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { SurfaceBackground, SurfacePrimary } from './surface';
import { AnimateFadeIn } from './animations/animate-fade-in';
import { CardPadding } from './card';
import { Title } from './typography/title';
import { IconButton } from './buttons/icon-button';
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

          <div className="fixed inset-0 flex h-screen w-screen justify-end overflow-hidden pl-base">
            <SurfacePrimary asChild>
              <CardPadding asChild>
                <motion.div
                  key="panel"
                  className="z-10 flex min-h-full w-full max-w-2xl"
                  initial={{ x: '100%', opacity: 1 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '100%', opacity: 1 }}
                >
                  <Dialog.Panel className="flex flex-col justify-center py-xl">
                    <header className="mb-xl flex items-center justify-between">
                      <Dialog.Title>
                        <Title asChild>
                          <span>{props.title}</span>
                        </Title>
                      </Dialog.Title>
                      <IconButton onClick={() => props.onClose()}>
                        <XMarkIcon />
                      </IconButton>
                    </header>
                    <Prose>
                      <Dialog.Description>
                        {props.description}
                      </Dialog.Description>
                      {props.body}
                    </Prose>
                    <footer className="mt-auto flex w-full gap-sm">
                      {props.actions}
                    </footer>
                  </Dialog.Panel>
                </motion.div>
              </CardPadding>
            </SurfacePrimary>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
