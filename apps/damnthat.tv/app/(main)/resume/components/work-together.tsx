import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import { SelectionButton } from '@workspace/ui/components/selection-button';
import {
  CTAButton,
} from '@workspace/ui/components/cta-button';
import { PrismicRichText } from '@prismicio/react';
import { Prose } from '@/components/typography/prose';
import { DismissibleBanner } from '@/components/dismissible-banner';
import { AnimatePresence } from 'motion/react';
import { AnimateHeight } from '@/components/animations/animate-height';
import { Button } from '@workspace/ui/components/button';
import type { WorkTogetherSlice } from '../../../../prismicio-types';

export const WORK_TOGETHER_ID = 'work-together';

type WorkTogetherMessageProps = {
  primary: WorkTogetherSlice['primary'];
  dismiss: () => void;
};

const WorkTogetherMessage = ({
  primary,
  dismiss,
}: WorkTogetherMessageProps) => {
  const showInterest = useShowInterest(dismiss);

  return (
    <section className="flex flex-row flex-wrap items-center justify-center">
      <div className="font-futura text-xl font-normal md:text-2xl">
        <PrismicRichText field={primary.title} />
      </div>
      <div className="mt-md gap-sm flex w-full justify-center">
        <SelectionButton
          isSelected={showInterest.isInterested}
          onClick={showInterest.onClickInterested}
          icon={<HandThumbUpIcon />}
          className="min-w-36"
        >
          Yep!
        </SelectionButton>
        <SelectionButton
          isSelected={showInterest.isNotInterested}
          onClick={showInterest.onClickNotInterested}
          icon={<HandThumbDownIcon />}
          className="min-w-36"
        >
          No Thanks
        </SelectionButton>
      </div>
      <AnimatePresence initial={false}>
        {showInterest.isInterested && (
          <AnimateHeight key="interested">
            <div className="mt-lg w-full text-center">
              <Prose className={clsx('mx-auto max-w-md')}>
                <PrismicRichText field={primary.body_yes} />
              </Prose>
              <div className="my-lg flex justify-center">
                <a href="mailto:jscsmith@gmail.com">
                  <CTAButton
                    buttonSize="default"
                    buttonType="pepto"
                  >
                    Email me!
                  </CTAButton>
                </a>
              </div>
              <Prose className="text-xs">
                <PrismicRichText field={primary.note} />
              </Prose>
            </div>
          </AnimateHeight>
        )}
        {showInterest.isNotInterested && (
          <AnimateHeight key="not-interested">
            <div className="mt-lg w-full text-center">
              <Prose className={clsx('mx-auto max-w-md')}>
                <p className="text-gray-600">No worries, carry on.</p>
                <p className="text-sm text-gray-600">
                  This message will self destruct in:
                </p>
                <div className="my-md text-4xl font-bold text-rose-500">
                  {showInterest.countdown}
                </div>
              </Prose>
              <div className="mt-md">
                <Button
                  size="sm"
                  variant="danger"
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

export const WorkTogether = (props: WorkTogetherSlice) => {
  return (
    <DismissibleBanner id={WORK_TOGETHER_ID} className="my-xl rounded-lg">
      {({ dismiss }) => (
        <WorkTogetherMessage primary={props.primary} dismiss={dismiss} />
      )}
    </DismissibleBanner>
  );
};
