import cx from 'classnames';
import React, { useState } from 'react';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline';
import { SelectionButton } from '@/components/selection-button';
import { Button, ButtonSizes, ButtonTypes } from '@/components/button';
import { RichText, RichTextBlock } from 'prismic-reactjs';
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
    <section
      id={WORK_TOGETHER_ID}
      className={cx(
        ' my-lg flex flex-row flex-wrap items-center justify-center rounded-lg border-2 p-lg',
        showDeets
          ? 'border-solid border-peach bg-gray-50'
          : 'border-dotted border-gray-200 hover:bg-gray-50',
      )}
    >
      {/* <div className="flex w-full items-center justify-center -mt-12">
        <QuestionMarkCircleIcon className="w-6 block shrink-0 mx-sm" />
      </div> */}
      <div className="text-xl font-normal text-plum md:text-2xl">
        <RichText render={props.primary.title} />
      </div>
      <div className="mt-md flex w-full justify-center gap-sm">
        <SelectionButton
          isSelected={showDeets === true}
          onClick={() => setDeets(true)}
        >
          Yep! <ThumbUpIcon className={cx('ml-xs inline-block w-6')} />
        </SelectionButton>
        <SelectionButton
          isSelected={showDeets === false}
          onClick={() => setDeets(false)}
        >
          No thanks.
          <ThumbDownIcon className={cx('ml-xs inline-block w-6')} />
        </SelectionButton>
      </div>
      {isInterested && (
        <div className="mt-lg w-full text-center">
          <div className={cx('prose mx-auto max-w-md')}>
            <RichText render={props.primary.body_yes} />
          </div>
          <div className="my-lg flex justify-center">
            <a href="mailto:jscsmith@gmail.com">
              <Button
                buttonSize={ButtonSizes.default}
                buttonType={ButtonTypes.pepto}
              >
                Email me!
              </Button>
            </a>
          </div>
          <div className="text-xs text-lunar">
            <RichText render={props.primary.note} />
          </div>
        </div>
      )}
      {isNotInterested && (
        <div className={cx('prose mt-lg w-full text-center')}>
          <p>No worries, carry on.</p>
        </div>
      )}
    </section>
  );
};
