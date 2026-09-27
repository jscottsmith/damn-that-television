import clsx from 'clsx';
import styles from './index.module.scss';
import { Card } from '@/components/card';
import { Prose } from '@workspace/ui/components/typography/prose';
import { defaultContentRoot } from '../../../../../lib/content/images';
import { renderContentMdx } from '../../../../../lib/content/render';

import { INTRO_ID } from './id';

export async function Introduction({ source }: { source: string }) {
  const contentRoot = defaultContentRoot();
  const content = await renderContentMdx(source, {
    contentRoot,
    directory: contentRoot,
    prose: false,
  });

  return (
    <article className={clsx(styles.welcome)} id={INTRO_ID}>
      <Card className="p-4 md:p-6">
        <Prose className="prose-lg lg:prose-xl xl:prose-2xl max-w-2xl">
          {content}
        </Prose>
      </Card>
    </article>
  );
}
