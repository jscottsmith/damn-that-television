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
import { SurfaceSecondary } from '@/components/surface';
export const WORK_TOGETHER_ID = 'work-together';

type WorkTogetherProps = {
  primary: {
    body_yes: RichTextBlock[];
    body_no: RichTextBlock[];
    note: RichTextBlock[];
    title: RichTextBlock[];
  };
};

export const WorkTogether = (props: WorkTogetherProps) => {
  const [showDeets, setDeets] = useState<boolean | null>(null);
  const isInterested = showDeets === true;
  const isNotInterested = showDeets === false;

  return (
    <SurfaceSecondary asChild>
      <section
        id={WORK_TOGETHER_ID}
        className={clsx(
          ' my-lg flex flex-row flex-wrap items-center justify-center rounded-lg p-lg',
        )}
      >
        <div className="text-xl font-normal font-futura md:text-2xl">
          <RichText render={props.primary.title} />
        </div>
        <div className="mt-md flex w-full justify-center gap-sm">
          <SelectionButton
            isSelected={showDeets === true}
            onClick={() => setDeets(true)}
            icon={<HandThumbUpIcon />}
          >
            Yep!
          </SelectionButton>
          <SelectionButton
            isSelected={showDeets === false}
            onClick={() => setDeets(false)}
            icon={<HandThumbDownIcon />}
          >
            No Thanks
          </SelectionButton>
        </div>
        {isInterested && (
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
            <div className="text-xs">
              <RichText render={props.primary.note} />
            </div>
          </div>
        )}
        {isNotInterested && (
          <Prose className={clsx('mt-lg w-full text-center')}>
            <p>No worries, carry on.</p>
          </Prose>
        )}
      </section>
    </SurfaceSecondary>
  );
};
