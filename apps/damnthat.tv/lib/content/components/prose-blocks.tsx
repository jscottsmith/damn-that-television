import { createElement, type HTMLAttributes } from 'react';
import { Prose } from '@workspace/ui/components/typography/prose';

const proseClass = 'prose xl:prose-lg mx-auto';

function block(
  tag:
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'ul'
    | 'ol'
    | 'blockquote',
) {
  return function ProseBlock(props: HTMLAttributes<HTMLElement>) {
    return <Prose className={proseClass}>{createElement(tag, props)}</Prose>;
  };
}

export const proseBlocks = {
  p: block('p'),
  h1: block('h1'),
  h2: block('h2'),
  h3: block('h3'),
  h4: block('h4'),
  h5: block('h5'),
  h6: block('h6'),
  ul: block('ul'),
  ol: block('ol'),
  blockquote: block('blockquote'),
};
