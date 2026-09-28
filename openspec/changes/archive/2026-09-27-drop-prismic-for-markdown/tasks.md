# Tasks

## 1. Export content into the repo

- [x] 1.1 Export the homepage introduction, every post, and the résumé from Prismic into `apps/damnthat.tv/content/` using the layout in design.md (markdown intro, MDX posts, one résumé MDX file with frontmatter for name, title, location, and links, and body sections as markdown plus components). Record whether `employers_recruiters` has content used by a route. Verify the three content types exist on disk and the employers note is in the change or a code comment next to the export.
- [x] 1.2 Download content images next to the files that reference them (Option A): post heroes, thumbs if a separate crop exists, gallery media, meta images, and résumé logos. Leave `public/static` files where they are. Verify content files contain no `images.prismic.io` URLs.
- [x] 1.3 Map `is_live: false` to `draft: true`, and carry `published_on`, tags, and SEO fields into frontmatter. Both exported posts are published, so both are `draft: false`; Prismic has no unpublished post to export. Verify `publishedOn`, tags, and SEO fields are present and published posts sort by `publishedOn` descending. Draft hiding is covered later with a fixture, not a made-up post in `content/`.

## 2. Local content reader

- [x] 2.1 Add a repository reader that loads the homepage markdown, post MDX (frontmatter plus body), and résumé MDX (frontmatter plus body), and resolves relative image paths for `next/image`. Verify a unit test loads a fixture post and returns its title, hero path, and body.
- [x] 2.2 Implement draft filtering and ordering in the reader: production omits `draft: true`; other environments include drafts; posts order by `publishedOn` descending; an unknown uid is a missing result. Verify unit tests cover all four cases.
- [x] 2.3 Add MDX components for gallery, code block, and embed that reuse the current presentation components with plain props. Verify a fixture MDX body renders those three components without `@prismicio` types.

## 3. Homepage and writing pages

- [x] 3.1 Render the homepage introduction from the reader inside the existing introduction section. Verify the homepage module no longer imports `prismicio` and the introduction text from `content/` is what the page passes through.
- [x] 3.2 Render `/words` from the reader with title, description, thumbnail, tags, and links, newest first. Verify the page source uses the reader and a test or fixture asserts draft posts are excluded when `NODE_ENV` is `production`.
- [x] 3.3 Render `/words/[uid]` from MDX, including hero, title, tags, and metadata (`metaTitle` falling back to `title`, plus description and meta image). Verify `generateMetadata` reads frontmatter and a missing uid or a production draft calls `notFound()`.

## 4. Résumé page

- [x] 4.1 Feed the résumé header from MDX frontmatter and the body sections (links, work history, condensed work history, education, awards, lists, prose, work-together) from the MDX body, including company logos. Verify the résumé route no longer imports `prismicio` and each section still receives the fields it renders today.

## 5. Remove Prismic

- [x] 5.1 Delete the Prismic client, generated types, custom types, Slice Machine config, slice models and mocks, the slice simulator, and `app/api/preview`, `app/api/exit-preview`, and `app/api/revalidate`. Drop `@prismicio/*` and Slice Machine dependencies and the `images.prismic.io` remote pattern. Update `apps/damnthat.tv/types/README.md` so it no longer documents Slice Machine. Verify `rg -n "@prismicio|prismicio|slicemachine" apps/damnthat.tv` finds no remaining source references outside lockfile history, and `pnpm --filter @damn-that-television/damnthat.tv typeCheck` succeeds.
- [x] 5.2 Render the homepage, `/words`, one published post, one draft post in a non-production build, and the résumé, and confirm images are not requested from `images.prismic.io`. Verify by loading those routes against the dev server (or the production build for the draft-hidden case) and checking the document responses.
