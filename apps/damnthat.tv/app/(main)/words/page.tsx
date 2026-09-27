import { Prose } from '@workspace/ui/components/typography/prose';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import Tags from './component/tags';
import { SurfaceInteractiveSimple } from '@/components/surface-interactive';
import {
  contentImageDimensions,
  defaultContentRoot,
} from '../../../lib/content/images';
import { getPosts } from '../../../lib/content/read';
import { renderContentMdx } from '../../../lib/content/render';
import type { ContentPost } from '../../../lib/content/types';

function imageSize(src: string) {
  return contentImageDimensions(src) ?? { width: 1200, height: 1200 };
}

export async function WordsIndex({ posts }: { posts: ContentPost[] }) {
  const items = await Promise.all(
    posts.map(async (post) => ({
      post,
      description: post.description
        ? await renderContentMdx(post.description, {
            contentRoot: defaultContentRoot(),
            directory: post.directory,
            prose: false,
          })
        : null,
    })),
  );

  return (
    <nav>
      <header className="mb-3 md:mb-6 xl:mb-8">
        <h2 className="text-center text-2xl font-medium">Words belong here</h2>
      </header>
      <ul className="space-y-2 md:space-y-4">
        {items.map(({ post, description }) => {
          const thumb = imageSize(post.thumb);

          return (
            <li key={post.uid} className="text-xl font-light">
              <SurfaceInteractiveSimple asChild>
                <Link
                  href={`/words/${post.uid}`}
                  className="-m-2 flex flex-row flex-wrap items-center gap-2 p-2 md:gap-4 lg:flex-nowrap"
                >
                  <div className="bg-muted flex aspect-square w-48 shrink-0 items-center justify-center rounded-md">
                    {post.thumb ? (
                      <Image
                        src={post.thumb}
                        alt={post.heroAlt || post.title}
                        width={thumb.width}
                        height={thumb.height}
                        className="aspect-square w-48 shrink-0 rounded-md object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex w-full grow items-center">
                    <div className="grow">
                      <h2 className="text-xl font-medium md:text-2xl">
                        {post.title}
                      </h2>
                      {description ? (
                        <Prose className="prose-md md:prose-lg text-pretty">
                          {description}
                        </Prose>
                      ) : null}
                      {post.tags.length > 0 && (
                        <div className="mt-3">
                          <Tags tags={post.tags} />
                        </div>
                      )}
                    </div>
                    <ArrowRightIcon className="text-muted-foreground mr-2 h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Link>
              </SurfaceInteractiveSimple>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Page() {
  return <WordsIndex posts={getPosts()} />;
}
