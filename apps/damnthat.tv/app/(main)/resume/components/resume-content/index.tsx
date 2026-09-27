import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Prose } from '@workspace/ui/components/typography/prose';
import { SectionTitle } from '../SectionTitle';

export const ResumeContent = ({
  title,
  large = false,
  children,
}: {
  title?: string;
  large?: boolean;
  includeInPrint?: boolean;
  children?: ReactNode;
}) => {
  return (
    <>
      <SectionTitle text={title} />
      <Prose className={clsx({ 'prose-xl': large })}>{children}</Prose>
    </>
  );
};
