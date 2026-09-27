import { Children, isValidElement, type ReactNode } from 'react';
import type { BundledLanguage } from 'shiki';
import { CodeBlock } from './code-block';

function textContent(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => textContent(child)).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return textContent(children.props.children);
  }

  return '';
}

export function MarkdownPre({ children }: { children?: ReactNode }) {
  const [child] = Children.toArray(children);

  if (
    isValidElement<{ className?: string; children?: ReactNode }>(child) &&
    child.type === 'code'
  ) {
    const match = /language-([\w-]+)/.exec(child.props.className ?? '');
    const lang = match?.[1];

    if (lang) {
      return (
        <CodeBlock
          lang={lang as BundledLanguage}
          code={textContent(child.props.children)}
        />
      );
    }
  }

  return <pre>{children}</pre>;
}
