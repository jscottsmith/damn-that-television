import { compileMDX, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { createContentMdxComponents } from './components';

type MdxComponents = NonNullable<MDXRemoteProps['components']>;

export async function renderContentMdx(
  source: string,
  input: {
    contentRoot: string;
    directory: string;
    prose?: boolean;
    components?: MdxComponents;
  },
) {
  const { content } = await compileMDX({
    source,
    components: {
      ...createContentMdxComponents(input),
      ...input.components,
    },
    options: {
      // Posts and the résumé use JSX expressions such as `columns={2}` and `src={"./hero.jpg"}`.
      parseFrontmatter: false,
      blockJS: false,
    },
  });

  return content;
}
