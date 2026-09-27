import type { ReactNode } from 'react';
import type { BundledLanguage } from 'shiki';
import { CodeBlock as HighlightedCode } from '@/components/code-block';
import { Prose } from '@workspace/ui/components/typography/prose';

function textContent(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => textContent(child)).join('');
  }

  return '';
}

export function CodeBlock({
  lang,
  code,
  children,
}: {
  lang: BundledLanguage;
  code?: string;
  children?: ReactNode;
}) {
  const source = (code ?? textContent(children)).replace(/\n$/, '');

  return (
    <section data-content-block="code">
      <Prose className="prose xl:prose-lg mx-auto">
        <HighlightedCode lang={lang}>{source}</HighlightedCode>
      </Prose>
    </section>
  );
}
