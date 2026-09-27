# Proposal

## Why

damnthat.tv loads the homepage introduction, writing, and résumé from Prismic at request time. That CMS, its image CDN, Slice Machine, and preview/revalidation routes are the only reason the site cannot be built entirely from the repository. Moving that content into markdown and MDX removes the external content dependency.

## What Changes

- Replace Prismic documents with in-repo content for the homepage introduction, `/words` posts, and the résumé.
- Use MDX for writing, where posts today mix prose with gallery, code, and embed slices. Use markdown or structured local data for the homepage intro and résumé, which are not freeform prose.
- Keep the current public URLs and the existing visual sections (work history, education, awards, galleries, code blocks, embeds).
- Hide unpublished writing in production the way `is_live` does today, using frontmatter instead of a CMS flag.
- **BREAKING**: Remove the Prismic client, Slice Machine, custom types, generated Prismic types, the slice simulator, and the preview, exit-preview, and revalidate API routes.
- **BREAKING**: Stop serving content images from `images.prismic.io`. Where those images live is an open choice; see design. The working assumption is that content media moves into the repo next to the files that reference it. UI and game files already under `public/static` stay where they are.
- Confirm whether the unused `employers_recruiters` custom type has published content. If it does not back a page, drop it with Prismic.

## Capabilities

### New Capabilities

- `site-content`: Homepage introduction, writing index and posts, and résumé are read from files in the repository, including their images, with no Prismic runtime.

### Modified Capabilities

- None. The project has no existing specs.

## Impact

- `apps/damnthat.tv`: homepage, `/words`, `/words/[uid]`, résumé, `components/media-asset.tsx`, slice presentation components, `prismicio.ts`, `prismicio-types.d.ts`, `customtypes/`, `slices/` models and simulator, `app/api/preview`, `app/api/exit-preview`, `app/api/revalidate`, `next.config.js` image remote patterns.
- Dependencies to remove: `@prismicio/client`, `@prismicio/next`, `@prismicio/react`, Slice Machine packages. A local markdown/MDX loader is added.
- Content and content images currently exist only in Prismic and must be exported before the client is removed. Env vars `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` and any Prismic webhook secret become unused.
- Giphy remote images and files already in `public/static` (avatar, game sprites, résumé PDF) are unchanged.
