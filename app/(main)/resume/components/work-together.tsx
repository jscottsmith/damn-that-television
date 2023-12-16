import clsx from 'clsx';
import React, { useState } from 'react';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import { SelectionButton } from '@/components/buttons/selection-button';
import {
  CTAButton,
  CTAButtonSizes,
  CTAButtonTypes,
} from '@/components/buttons/cta-button';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import { Prose } from '@/components/typography/prose';
import { DismissibleBanner } from '@/components/dismissible-banner';
import { AnimatePresence } from 'framer-motion';
import { AnimateHeight } from '@/components/animations/animate-height';

type WorkTogetherProps = {
  primary: {
    body_yes: RichTextBlock[];
    body_no: RichTextBlock[];
    note: RichTextBlock[];
    title: RichTextBlock[];
  };
};

export const WORK_TOGETHER_ID = 'work-together';

function useShowInterest() {
  const [interest, setInterest] = useState<boolean | null>(null);
  const isInterested = interest === true;
  const isNotInterested = interest === false;
  const isNull = interest === null;

  function onClickInterested() {
    isNull || isNotInterested ? setInterest(true) : setInterest(null);
  }
  function onClickNotInterested() {
    isNull || isInterested ? setInterest(false) : setInterest(null);
  }

  return {
    onClickInterested,
    onClickNotInterested,
    isInterested,
    isNotInterested,
  };
}

export const WorkTogether = (props: WorkTogetherProps) => {
  const showInterest = useShowInterest();
  return (
    <DismissibleBanner id={WORK_TOGETHER_ID} className="my-xl rounded-lg">
      <section className="flex flex-row flex-wrap items-center justify-center">
        <div className="font-futura text-xl font-normal md:text-2xl">
          <RichText render={props.primary.title} />
        </div>
        <div className="mt-md flex w-full justify-center gap-sm">
          <SelectionButton
            isSelected={showInterest.isInterested}
            onClick={showInterest.onClickInterested}
            icon={<HandThumbUpIcon />}
            className="min-w-[9rem]"
          >
            Yep!
          </SelectionButton>
          <SelectionButton
            isSelected={showInterest.isNotInterested}
            onClick={showInterest.onClickNotInterested}
            icon={<HandThumbDownIcon />}
            className="min-w-[9rem]"
          >
            No Thanks
          </SelectionButton>
        </div>
        <AnimatePresence initial={false}>
          {showInterest.isInterested && (
            <AnimateHeight key="interested">
              <div className="mt-lg w-full text-center">
                <Prose className={clsx('mx-auto max-w-md')}>
                  <RichText render={props.primary.body_yes} />
                </Prose>
                <div className="my-lg flex justify-center">
                  <a href="mailto:jscsmith@gmail.com">
                    <CTAButton
                      buttonSize={CTAButtonSizes.default}
                      buttonType={CTAButtonTypes.pepto}
                    >
                      Email me!
                    </CTAButton>
                  </a>
                </div>
                <Prose className="text-xs">
                  <RichText render={props.primary.note} />
                </Prose>
              </div>
            </AnimateHeight>
          )}
          {showInterest.isNotInterested && (
            <AnimateHeight key="not-interested">
              <Prose className={clsx('mt-lg w-full text-center')}>
                <p>No worries, carry on.</p>
              </Prose>
            </AnimateHeight>
          )}
        </AnimatePresence>
      </section>
    </DismissibleBanner>
  );
};
