'use server';
import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import './index.css';

interface Props {
  children: string;
  lang: BundledLanguage;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'material-theme',
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
