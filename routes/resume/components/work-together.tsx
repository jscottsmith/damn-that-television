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
  const [showDeets, setDeets] = useState(null);
  const isInterested = showDeets === true;
  const isNotInterested = showDeets === false;
  return (
    <section
      id={WORK_TOGETHER_ID}
      className={cx(
        ' border-2 rounded-lg p-lg flex flex-row flex-wrap items-center justify-center my-lg',
        showDeets
          ? 'border-solid bg-gray-50 border-peach'
          : 'border-dotted hover:bg-gray-50 border-gray-200',
      )}
    >
      {/* <div className="flex w-full items-center justify-center -mt-12">
        <QuestionMarkCircleIcon className="w-6 block shrink-0 mx-sm" />
      </div> */}
      <div className="text-xl md:text-2xl font-normal text-plum">
        <RichText render={props.primary.title} />
      </div>
      <div className="w-full flex gap-sm justify-center mt-md">
        <SelectionButton
          isSelected={showDeets === true}
          onClick={() => setDeets(true)}
        >
          Yep! <ThumbUpIcon className={cx('w-6 inline-block ml-xs')} />
        </SelectionButton>
        <SelectionButton
          isSelected={showDeets === false}
          onClick={() => setDeets(false)}
        >
          No thanks.
          <ThumbDownIcon className={cx('w-6 inline-block ml-xs')} />
        </SelectionButton>
      </div>
      {isInterested && (
        <div className="w-full mt-lg text-center">
          <div className={cx('prose max-w-md mx-auto')}>
            <RichText render={props.primary.body_yes} />
          </div>
          <div className="flex justify-center my-lg">
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
        <div className={cx('w-full mt-lg prose text-center')}>
          <p>No worries, carry on.</p>
        </div>
      )}
    </section>
  );
};
