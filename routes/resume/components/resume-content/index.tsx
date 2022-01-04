import { RichText } from 'prismic-reactjs';
import cx from 'classnames';
import React from 'react';

export const ResumeContent = (props) => {
  return (
    <div className={cx('prose', { 'prose-lg': props.primary.large_copy })}>
      <RichText render={props.primary.title} />
      <RichText render={props.primary.content} />
    </div>
  );
};
