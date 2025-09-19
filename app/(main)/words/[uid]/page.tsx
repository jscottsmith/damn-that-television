import { SiteWrapper } from '@/components/site-wrapper';
import { SurfaceBackground, SurfacePrimary } from '@/components/surface';
import { Prose } from '@/components/typography/prose';
import { PrismicRichText } from '@prismicio/react';
import { createClient } from 'prismicio';
import { ProjectDocument } from 'prismicio-types';

interface PageProps {
  params: Promise<{ uid: string }>;
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  const client = createClient();
  const document = await client.getByUID<ProjectDocument>('project', uid);

  return (
    <>
      <h1 className="text-2xl font-bold">{document.data.title}</h1>
      <Prose className="prose-xl">
        <PrismicRichText field={document.data.description} />
      </Prose>
    </>
  );
}
