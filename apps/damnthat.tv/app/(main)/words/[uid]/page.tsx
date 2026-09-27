import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Tags from '../component/tags';
import {
  contentImageDimensions,
  defaultContentRoot,
} from '../../../../lib/content/images';
import { getPost } from '../../../../lib/content/read';
import { renderContentMdx } from '../../../../lib/content/render';
import type { ContentPost } from '../../../../lib/content/types';

interface PageProps {
  params: Promise<{ uid: string }>;
}

function imageSize(src: string) {
  return contentImageDimensions(src) ?? { width: 1200, height: 800 };
}

export function postOrNotFound(post: ContentPost | null): ContentPost {
  if (!post) {
    notFound();
  }

  return post;
}

export function buildPostMetadata(post: ContentPost): Metadata {
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.description || undefined;
  const size = post.metaImage ? imageSize(post.metaImage) : null;
  const images = post.metaImage
    ? [
        {
          url: post.metaImage,
          width: size?.width,
          height: size?.height,
          alt: post.heroAlt || title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uid } = await params;
  return buildPostMetadata(postOrNotFound(getPost(uid)));
}

export async function PostArticle({ post }: { post: ContentPost }) {
  const contentRoot = defaultContentRoot();
  const body = await renderContentMdx(post.body, {
    contentRoot,
    directory: post.directory,
  });
  const hero = imageSize(post.hero);

  return (
    <>
      <header className="mb-8 xl:mb-12">
        {post.hero ? (
          <Image
            src={post.hero}
            alt={post.heroAlt || post.title}
            width={hero.width}
            height={hero.height}
            className="h-auto w-full rounded-lg"
            priority
          />
        ) : null}
        <div className="my-8 xl:my-12">
          <h1 className="font-futura text-foreground mb-3 text-center text-4xl font-medium text-balance md:text-6xl">
            {post.title}
          </h1>
          <div className="mb-3 flex justify-center">
            <Tags tags={post.tags} />
          </div>
        </div>
        <hr />
      </header>
      {body}
    </>
  );
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  return <PostArticle post={postOrNotFound(getPost(uid))} />;
}
