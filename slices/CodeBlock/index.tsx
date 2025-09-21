import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { CodeBlock as CodeBlockComponent } from '@/components/code-block';
import { Prose } from '@/components/typography/prose';

/**
 * Props for `CodeBlock`.
 */
export type CodeBlockProps = SliceComponentProps<Content.CodeBlockSlice>;

/**
 * Component for "CodeBlock" Slices.
 */
const CodeBlock: FC<CodeBlockProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Prose className="prose mx-auto xl:prose-lg">
        <CodeBlockComponent lang={slice.primary.language!}>
          {slice.primary.code || ''}
        </CodeBlockComponent>
      </Prose>
    </section>
  );
};

export default CodeBlock;
