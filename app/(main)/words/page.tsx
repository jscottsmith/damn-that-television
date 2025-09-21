import { Prose } from '@/components/typography/prose';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { createClient } from 'prismicio';
import { PostDocument } from 'prismicio-types';
import Tags from './component/tags';
import { SurfaceInteractiveSimple } from '@/components/surface-interactive';

export default async function Page() {
  const client = createClient();
  const documents = await client.getAllByType<PostDocument>('post', {
    orderings: [
      //  todo
      //   { field: 'my.blog_post.publication_date', direction: 'desc' },
      //   { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  const liveDocuments = documents.filter(
    (document) =>
      process.env.NODE_ENV !== 'production'
        ? true // show all documents in other environments
        : document.data.is_live === true, // show only live documents in production
  );

  return (
    <nav>
      <header className="mb-base md:mb-lg xl:mb-xl">
        <h2 className="text-center text-2xl font-medium">Words belong here</h2>
      </header>
      <ul className="space-y-2 md:space-y-4">
        {liveDocuments.map(
          (document) =>
            document.url && (
              <li key={document.id} className="text-xl font-light">
                <SurfaceInteractiveSimple asChild>
                  <PrismicNextLink
                    href={document.url ?? ''}
                    className="-m-2 flex flex-row flex-wrap items-center gap-2 p-2 md:gap-4 lg:flex-nowrap"
                  >
                    <div className="flex aspect-square w-48 shrink-0 items-center justify-center rounded-md bg-slate-500/20">
                      <PrismicNextImage
                        field={document.data.image.thumb}
                        className="aspect-square w-48 shrink-0 rounded-md"
                      />
                    </div>
                    <div className="flex w-full grow items-center">
                      <div className="grow">
                        <h2 className="text-xl font-medium md:text-2xl">
                          {document.data.title}
                        </h2>
                        <Prose className="prose-md md:prose-lg">
                          <PrismicRichText field={document.data.description} />
                        </Prose>
                        {document.tags.length > 0 && (
                          <div className="mt-base">
                            <Tags tags={document.tags} />
                          </div>
                        )}
                      </div>
                      <ArrowRightIcon className="mr-2 h-6 w-6 shrink-0 text-slate-500 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </PrismicNextLink>
                </SurfaceInteractiveSimple>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
}
