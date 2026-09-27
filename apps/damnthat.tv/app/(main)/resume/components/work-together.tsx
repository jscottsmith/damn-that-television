'use client';

import clsx from 'clsx';
import { useState, useEffect, type ReactNode } from 'react';
import { useCountdown } from 'usehooks-ts';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import { ButtonToggle } from '@workspace/ui/components/button-toggle';
import { CTAButton } from '@workspace/ui/components/cta-button';
import { Prose } from '@workspace/ui/components/typography/prose';
import { DismissibleBanner } from '@/components/dismissible-banner';
import { AnimatePresence } from 'motion/react';
import { AnimateHeight } from '@/components/animations/animate-height';
import { Button } from '@workspace/ui/components/button';

export const WORK_TOGETHER_ID = 'work-together';

type WorkTogetherMessageProps = {
  title?: string;
  note?: string;
  declined?: string;
  children?: ReactNode;
  dismiss: () => void;
};

const WorkTogetherMessage = ({
  title,
  note,
  declined = 'No worries, carry on.',
  children,
  dismiss,
}: WorkTogetherMessageProps) => {
  const showInterest = useShowInterest(dismiss);

  return (
    <section className="flex flex-row flex-wrap items-center justify-center">
      <div className="font-futura text-xl font-normal md:text-2xl">
        {title}
      </div>
      <div className="mt-4 flex w-full justify-center gap-2">
        <ButtonToggle
          isSelected={showInterest.isInterested}
          onClick={showInterest.onClickInterested}
          icon={<HandThumbUpIcon />}
          className="min-w-36"
        >
          Yep!
        </ButtonToggle>
        <ButtonToggle
          isSelected={showInterest.isNotInterested}
          onClick={showInterest.onClickNotInterested}
          icon={<HandThumbDownIcon />}
          className="min-w-36"
        >
          No Thanks
        </ButtonToggle>
      </div>
      <AnimatePresence initial={false}>
        {showInterest.isInterested && (
          <AnimateHeight key="interested">
            <div className="mt-6 w-full text-center">
              <Prose className={clsx('mx-auto max-w-md')}>
                {children}
              </Prose>
              <div className="my-6 flex justify-center">
                <a href="mailto:jscsmith@gmail.com">
                  <CTAButton buttonSize="default" buttonType="pepto">
                    Email me!
                  </CTAButton>
                </a>
              </div>
              <Prose className="text-xs">
                {note ? <p>{note}</p> : null}
              </Prose>
            </div>
          </AnimateHeight>
        )}
        {showInterest.isNotInterested && (
          <AnimateHeight key="not-interested">
            <div className="mt-6 w-full text-center">
              <Prose className={clsx('mx-auto max-w-md')}>
                <p className="text-muted-foreground">{declined}</p>
                <p className="text-muted-foreground text-sm">
                  This message will self destruct in:
                </p>
                <div className="my-4 text-4xl font-bold text-rose-500">
                  {showInterest.countdown}
                </div>
              </Prose>
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={showInterest.onCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </AnimateHeight>
        )}
      </AnimatePresence>
    </section>
  );
};

function useShowInterest(dismissBanner?: () => void) {
  const [interest, setInterest] = useState<boolean | null>(null);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 10,
      intervalMs: 1000,
      isIncrement: false,
    });
  const isInterested = interest === true;
  const isNotInterested = interest === false;
  const isNull = interest === null;

  // Auto-dismiss when countdown reaches 0
  useEffect(() => {
    if (count === 0 && isNotInterested) {
      dismissBanner?.();
      stopCountdown();
    }
  }, [count, isNotInterested, dismissBanner, stopCountdown]);

  function onClickInterested() {
    isNull || isNotInterested ? setInterest(true) : setInterest(null);
    stopCountdown(); // Stop countdown if switching to interested
    resetCountdown(); // Reset counter to 10
  }
  function onClickNotInterested() {
    if (isNull || isInterested) {
      setInterest(false);
      resetCountdown(); // Reset counter to 10
      startCountdown(); // Start countdown
    } else {
      setInterest(null);
      stopCountdown();
      resetCountdown();
    }
  }

  function onCancel() {
    setInterest(null);
    stopCountdown();
    resetCountdown();
  }

  return {
    onClickInterested,
    onClickNotInterested,
    onCancel,
    isInterested,
    isNotInterested,
    countdown: isNotInterested ? count : null,
  };
}

export const WorkTogether = (props: {
  title?: string;
  note?: string;
  declined?: string;
  children?: ReactNode;
}) => {
  return (
    <DismissibleBanner id={WORK_TOGETHER_ID} className="my-8 rounded-lg">
      {({ dismiss }) => (
        <WorkTogetherMessage
          title={props.title}
          note={props.note}
          declined={props.declined}
          dismiss={dismiss}
        >
          {props.children}
        </WorkTogetherMessage>
      )}
    </DismissibleBanner>
  );
};
