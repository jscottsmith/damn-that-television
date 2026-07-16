import React from 'react';
import clsx from 'clsx';
import { PrismicRichText } from '@prismicio/react';
import styles from './index.module.scss';
import { Card } from '@/components/card';
import { Prose } from '@/components/typography/prose';
import { Marquee } from '@/components/marquee';
import { surfaceVariants } from '@workspace/ui/components/surface';
import { cn } from '@workspace/ui/lib/utils';

export const INTRO_ID = 'who';

export const Introduction = (props) => {
  return (
    <article className={clsx(styles.welcome)} id={INTRO_ID}>
      <Card
        className={cn(surfaceVariants({ variant: 'secondary' }), 'p-4 md:p-6')}
      >
        <Prose className="prose-lg lg:prose-xl xl:prose-2xl max-w-2xl">
          <PrismicRichText field={props.document?.data?.introduction} />
        </Prose>
      </Card>
    </article>
  );
};
