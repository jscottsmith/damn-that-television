import path from 'node:path';
import Image from 'next/image';
import { readImageSize, resolveContentImageSrc } from '../images';
import { CodeBlock } from './code-block';
import { Embed } from './embed';
import { Gallery } from './gallery';
import { MarkdownPre } from './markdown-code';
import { Media } from './media';
import { proseBlocks } from './prose-blocks';

type ImageProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

export function createContentMdxComponents(input: {
  contentRoot: string;
  directory: string;
  prose?: boolean;
}) {
  function resolve(src: string) {
    return resolveContentImageSrc(input.contentRoot, input.directory, src);
  }

  return {
    ...(input.prose === false ? {} : proseBlocks),
    Gallery,
    Media: (props: Parameters<typeof Media>[0]) => (
      <Media {...props} src={resolve(props.src)} />
    ),
    CodeBlock,
    Embed,
    pre: MarkdownPre,
    img: ({ src, alt, width, height }: ImageProps) => {
      if (!src) {
        return null;
      }

      const resolvedSrc = resolve(src);
      const size = resolvedSrc.startsWith('/content-images/')
        ? readImageSize(path.resolve(input.directory, src))
        : null;
      const resolvedWidth = Number(width) || size?.width;
      const resolvedHeight = Number(height) || size?.height;

      if (!resolvedWidth || !resolvedHeight) {
        return null;
      }

      return (
        <Image
          src={resolvedSrc}
          alt={alt ?? ''}
          width={resolvedWidth}
          height={resolvedHeight}
          className="h-auto w-full"
        />
      );
    },
  };
}
