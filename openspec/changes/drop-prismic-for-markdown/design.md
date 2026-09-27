# Design

## Context

See proposal.md for why Prismic is being removed.

Today `apps/damnthat.tv` reads three live documents through `createClient()` in `prismicio.ts`:

- Homepage: one rich-text introduction. The homepage slice zone is unused.
- Writing: repeatable `post` documents at `/words` and `/words/:uid`. Body slices are prose (`content`), `gallery`, `code_block`, and `embed`. Posts have a hero image with a square `thumb` crop, tags, `published_on`, `is_live`, and SEO fields.
- Résumé: one singleton whose body is structured slices (links, work history, condensed work history, education, awards, lists, prose, work-together). Company logos are Prismic images. The avatar is already a local file at `public/static/avatar.jpg`.

`employers_recruiters` is a custom type with no page query. UI and game binaries already live in `public/static`. `next.config.js` allows `images.prismic.io` and `*.giphy.com`. Preview, exit-preview, and tag revalidation exist only for Prismic. There is no markdown or MDX pipeline yet.

## Goals / Non-Goals

**Goals:**

- One content root inside `apps/damnthat.tv`, read at build and request time with no CMS client.
- Preserve URLs, draft hiding, sort order, metadata, and the current section components.
- Remove Prismic packages, Slice Machine, generated types, and Prismic-only routes.
- Pick a media home that does not keep `images.prismic.io`.

**Non-Goals:**

- Redesigning page layout or rewriting the résumé section components' visuals.
- Moving game sprites, the avatar, the résumé PDF, or other files already in `public/static`.
- Adding a new CMS, preview toolbar, or on-demand revalidation webhook.
- Migrating Giphy or other third-party embeds off their current hosts.
- Building the gallery video support noted in `media-asset.tsx`.

## Decisions

### 1. Content shape: MDX for writing and the résumé, markdown for the intro

Writing posts become MDX because the body is prose plus React sections (gallery, code, embed). The homepage introduction is a single markdown file. The résumé is one MDX file, `content/resume/index.mdx`, so the site does not grow a second format or a directory of data files.

Résumé frontmatter holds the page-level fields: name, current job title, current role location, and link groups. The body is the ordered column. Prose sections stay markdown. Repeated structured sections (work history, education, awards, lists, work-together) are MDX components whose props carry dates, booleans, logos, keywords, and websites. Job writeups are the markdown children of those components, so they are not buried in frontmatter.

Frontmatter replaces Prismic fields on posts:

- `title`, `description`, `tags`, `publishedOn`, `draft` (`draft: true` replaces `is_live: false`)
- `metaTitle`, `metaDescription`, `metaImage`
- Hero image and thumb are files next to the post; the thumb may be the hero until a separate crop exists

MDX components replace slice renderers: `Gallery`, `CodeBlock`, `Embed`, and the résumé section components. Prose is the MDX body, so the Words slice wrapper goes away. Résumé section components stay and take plain props instead of Prismic slice objects.

**Alternatives:**

- Markdown only, with shortcodes for galleries and embeds. Weaker typing and a second template language beside React components that already exist.
- One `resume.yaml`, or one YAML file per section. A single YAML file keeps order, but it is a second format, and job prose ends up inside literal blocks. Several YAML files need an index to preserve section order.
- Putting the job list in résumé frontmatter. Frontmatter is a map, so the column sequence and the writeups become one long data block.
- Keep Slice Machine models and only swap the data source. The models exist to talk to Prismic and would be dead weight.

### 2. Content media: three options

Content images today are only on `images.prismic.io` (post heroes, gallery items, résumé logos, meta images). Files already in `public/static` are out of scope. The spec requires those content images to render without Prismic. These are the ways to do that.

**Option A — Colocate media with the content file (chosen).**

```text
apps/damnthat.tv/content/
  homepage.md
  resume/
    index.mdx
    logos/
  words/
    <uid>/
      index.mdx
      hero.jpg
      meta.jpg
      gallery/
```

Markdown and MDX refer to images with relative paths. A small resolver turns those paths into something `next/image` can optimize.

- Editing a post is one folder.
- Git history covers copy and media together.
- Nothing is left on Prismic after the repository is deleted.
- Binary files increase repo size. That is acceptable for this site's post and logo volume. Large video, if added later, should not go in git.
- Relative images need a resolver. MDX image syntax does not become a static import by itself.

**Option B — Text in `content/`, media in `public/`.**

Posts stay as above, but images live under `public/content/...` and are referenced by root paths such as `/content/words/<uid>/hero.jpg`.

- Next serves them as static files with no resolver.
- A post and its images are split across two trees, so moves and deletes are easier to get wrong.
- Mixes CMS exports with game and UI files if placed under `public/static`. Use `public/content/` if this option is chosen, not `public/static`.

**Option C — Text in the repo, media on an external host.**

Markdown stores absolute URLs (Cloudinary, Vercel Blob, S3, or similar). `next.config.js` gains that host and drops `images.prismic.io`.

- The repo stays text-only, which matters if galleries or video get large.
- Adds another account, and images are not reviewed in the same commit as the copy.
- Leaving the URLs on `images.prismic.io` is not this option. That still depends on Prismic and breaks when the repository is shut down.

**Chosen: Option A.** Tasks assume colocated files. Option B is the fallback if the relative-image resolver is more work than it is worth during implementation; switching to B does not change the spec. Option C needs a spec and task change before apply, because media would no longer ship inside the repository build by default.

### 3. Load content with a local reader, not a page-level MDX integration

Use `gray-matter` to read frontmatter and `next-mdx-remote/rsc` (or `@mdx-js` compiled for RSC, if that is the smaller dependency at implementation time) to render post and résumé bodies in server components. The same reader loads résumé frontmatter for the header. Pages call that reader instead of `createClient()`.

Draft filtering and date ordering happen in the reader so `/words` and the post page share one rule: production hides `draft: true`; other environments show drafts; missing uids call `notFound()`.

**Alternatives:**

- `@next/mdx` with posts as files under `app/`. Fights the existing `app/(main)/words/[uid]` route and makes draft filtering harder.
- Contentlayer or Velite. Extra build pipeline for three content types.

### 4. Delete the Prismic surface after content is in the repo

Export documents and download their media first. Then remove `prismicio.ts`, `prismicio-types.d.ts`, `customtypes/`, slice `model.json` / `mocks.json` / Slice Machine config, `app/slice-simulator`, `app/api/preview`, `app/api/exit-preview`, `app/api/revalidate`, the `images.prismic.io` remote pattern, and the `@prismicio/*` and Slice Machine dependencies. Keep presentation components that still render galleries, code, embeds, and résumé sections, retargeted at local props.

If the Prismic export shows `employers_recruiters` has no document used by a route, delete that type with the rest. If it has content that is actually rendered, stop and add it to this change before deleting the client.

## Risks / Trade-offs

- [Prismic content is not in git today] → Export and check the pages against production before removing the client. Rollback is restoring the Prismic client until that export is committed.
- [Repo growth from binaries] → Option A. If an export is unexpectedly large, switch that subset to Option B or revisit Option C before committing the files.
- [Rich text and image crops will not be pixel-identical] → Keep the same Prose styles and section components. Accept that Prismic thumb crops may become a dedicated file or the hero image.
- [Drafts become public if committed without `draft: true`] → Map `is_live: false` explicitly during export and cover it with the production filter.
- [Embed HTML from Prismic may include scripts] → Carry the existing embed HTML through unchanged. Do not broaden what embeds are allowed to do.

## Migration Plan

1. Export homepage, posts, and résumé from Prismic, including image files and the `is_live` / `published_on` / SEO fields.
2. Commit them under `content/` using Option A. Confirm `employers_recruiters`.
3. Wire pages to the local reader and retarget section components. Keep Prismic in place until the three routes match.
4. Remove Prismic code, routes, config, and dependencies.
5. Deploy. Publishing becomes a commit. There is no webhook.

Rollback before step 4 is reverting the page wiring. After step 4, rollback is restoring the Prismic integration and env vars; the exported files can stay.

## Open Questions

None that change the spec. Option C is a product choice, not an open implementation detail: say so before apply if content images should stay out of git.
