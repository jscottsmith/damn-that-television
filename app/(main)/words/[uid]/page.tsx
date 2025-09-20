import { PrismicNextImage } from '@prismicio/next';
import { SliceZone } from '@prismicio/react';
import { createClient } from 'prismicio';
import { PostDocument } from 'prismicio-types';
import { components } from 'slices';
import Tags from '../component/tags';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ uid: string }>;
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  const client = createClient();
  const document = await client
    .getByUID<PostDocument>('post', uid)
    .catch(() => {
      return notFound();
    });

  return (
    <>
      <header className="mb-xl xl:mb-2xl">
        <PrismicNextImage
          field={document.data.image}
          className="w-full rounded-lg"
        />
        <div className="my-xl xl:my-2xl">
          <h1 className="mb-base text-center font-futura text-4xl font-medium text-slate-700 dark:text-slate-300 md:text-6xl">
            {document.data.title}
          </h1>
          <div className="mb-base flex justify-center">
            <Tags tags={document.tags} />
          </div>
          {/* <Prose className="prose mx-auto text-center md:prose-xl">
            <PrismicRichText field={document.data.description} />
          </Prose> */}
        </div>
        <hr />
      </header>
      <SliceZone slices={document.data.slices} components={components} />
    </>
  );
}
