import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  tag?: string;
  orphans?: number;
}>;

export function Copy(props: Props) {
  const Tag = props.tag;
  const text = props.children;

  // @ts-expect-error
  const textarray = text.split(' ');
  const lastWord = textarray.length - props.orphans;
  const joinedText =
    textarray.slice(0, lastWord).join(' ') +
    ' ' +
    textarray.slice(lastWord).join('&nbsp;');

  function renderText() {
    return { __html: joinedText };
  }

  return (
    // @ts-expect-error
    <Tag className={props.className} dangerouslySetInnerHTML={renderText()} />
  );
}

Copy.defaultProps = {
  orphans: 2, // Default to two words
  tag: 'span',
  children: '',
};
