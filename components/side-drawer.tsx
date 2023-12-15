import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { SurfaceBackground, SurfacePrimary } from './surface';
import { AnimateFadeIn } from './animations/animate-fade-in';
import { CardPadding } from './card';
import { Title } from './typography/title';
import { IconButton } from './buttons/icon-button';
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
    <AnimatePresence initial={false}>
      {props.isOpen && (
        <Dialog
          static
          className="z-50 relative"
          open={props.isOpen}
          onClose={() => props.onClose()}
        >
          <AnimateFadeIn key="background">
            <SurfaceBackground asChild>
              <div
                className="fixed inset-0 bg-opacity-90 dark:bg-opacity-90"
                aria-hidden="true"
              />
            </SurfaceBackground>
          </AnimateFadeIn>

          <div className="fixed flex justify-end inset-0 w-screen h-screen overflow-hidden pl-base">
            <SurfacePrimary asChild>
              <CardPadding asChild>
                <motion.div
                  key="panel"
                  className="w-full max-w-2xl min-h-full flex z-10"
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
                    <footer className="mt-auto w-full flex gap-sm">
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
