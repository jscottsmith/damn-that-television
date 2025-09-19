import { Prose } from '@/components/typography/prose';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import clsx from 'clsx';
import { createClient } from 'prismicio';
import { ProjectDocument } from 'prismicio-types';

export default async function Page() {
  const client = createClient();
  const documents = await client.getAllByType<ProjectDocument>('project', {
    orderings: [
      //  todo
      //   { field: 'my.blog_post.publication_date', direction: 'desc' },
      //   { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return (
    <nav>
      <header className="mb-base md:mb-lg xl:mb-xl">
        <h2 className="text-center text-2xl font-medium">Words belong here</h2>
      </header>
      <ul>
        {documents.map(
          (document) =>
            document.url && (
              <li key={document.id} className="text-xl font-light">
                <PrismicNextLink
                  href={document.url ?? ''}
                  className={clsx(
                    'group relative -m-2 block rounded-md p-2 text-xs transition-colors',
                    'hover:bg-slate-100 dark:hover:bg-slate-700',
                    'flex flex-row flex-wrap items-center gap-2 md:gap-4',
                  )}
                >
                  <div className="flex aspect-square w-48 shrink-0 items-center justify-center rounded-md bg-slate-500/20">
                    img
                  </div>
                  <div className="flex grow items-center">
                    <div className="grow">
                      <h2 className="text-xl font-medium md:text-2xl">
                        {document.data.title}
                      </h2>
                      <Prose className="prose-md md:prose-lg">
                        <PrismicRichText field={document.data.description} />
                      </Prose>
                    </div>
                    <ArrowRightIcon className="mr-2 h-6 w-6 shrink-0 text-slate-500 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </PrismicNextLink>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
}
