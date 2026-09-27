# Spec Delta

## Purpose

Serve the homepage introduction, writing, and résumé from files in the repository so the site no longer depends on Prismic for content or content images.

## ADDED Requirements

### Requirement: Homepage introduction comes from repository content
The homepage SHALL render its introduction from content stored in the repository. The introduction SHALL support the same rich text the page shows today: paragraphs, headings, emphasis, links, and lists.

#### Scenario: Introduction is shown
- **WHEN** a visitor opens the homepage
- **THEN** the introduction text from the repository is shown in the existing introduction section

#### Scenario: Homepage does not call Prismic
- **WHEN** the homepage is rendered
- **THEN** the introduction is read from the repository and no Prismic API request is made

### Requirement: Writing index lists published posts
The `/words` page SHALL list writing stored in the repository. Each entry SHALL show its title, description, thumbnail, tags, and a link to the post. Entries SHALL be ordered by publish date, newest first. In production, only published posts SHALL appear.

#### Scenario: Published posts are listed newest first
- **WHEN** a visitor opens `/words` in production
- **THEN** each published post appears with its title, description, thumbnail, and tags
- **AND** posts are ordered by publish date descending

#### Scenario: Draft posts are omitted in production
- **WHEN** a post is marked unpublished and a visitor opens `/words` in production
- **THEN** that post is not listed

#### Scenario: Draft posts are visible outside production
- **WHEN** a post is marked unpublished and a visitor opens `/words` outside production
- **THEN** that post is listed

### Requirement: A post is available at its existing URL
A published post SHALL be available at `/words/<uid>`, where `<uid>` is the post's existing identifier. The page SHALL show the hero image, title, and tags, and SHALL render prose, galleries, code blocks, and embeds that the post contains. Page metadata SHALL use the post's meta title, meta description, and meta image when those are set, and SHALL fall back to the post title when meta title is absent.

#### Scenario: Published post renders
- **WHEN** a visitor opens `/words/<uid>` for a published post
- **THEN** the hero image, title, and tags are shown
- **AND** the post body renders its prose, galleries, code blocks, and embeds

#### Scenario: Metadata uses post fields
- **WHEN** a published post has a meta title, meta description, and meta image
- **THEN** the page metadata uses those values
- **AND** the Open Graph image uses the meta image

#### Scenario: Metadata falls back to the title
- **WHEN** a published post has no meta title
- **THEN** the page title uses the post title

### Requirement: Unpublished and missing posts are not publicly available
In production, an unpublished post SHALL respond as not found at `/words/<uid>`. A uid that does not match any post SHALL respond as not found in every environment. Outside production, an unpublished post SHALL still render.

#### Scenario: Draft post is hidden in production
- **WHEN** a visitor opens `/words/<uid>` in production for an unpublished post
- **THEN** the response is not found

#### Scenario: Draft post renders outside production
- **WHEN** a visitor opens `/words/<uid>` outside production for an unpublished post
- **THEN** the post renders

#### Scenario: Unknown uid is not found
- **WHEN** a visitor opens `/words/<uid>` for a uid that has no post
- **THEN** the response is not found

### Requirement: Résumé content comes from repository content
The résumé page SHALL render its name, current job title, current role location, links, and body sections from content stored in the repository. Body sections SHALL include work history, condensed work history, education, awards, lists, prose, and the work-together block when that content exists. Work history SHALL keep company, role, dates, present-role state, website, description, and company logo.

#### Scenario: Résumé sections render
- **WHEN** a visitor opens the résumé page
- **THEN** the header and each body section from the repository content are shown with their current layout

#### Scenario: Résumé does not call Prismic
- **WHEN** the résumé page is rendered
- **THEN** its content is read from the repository and no Prismic API request is made

### Requirement: Content media does not depend on Prismic
Images and other media referenced by homepage, writing, and résumé content SHALL render without requesting the Prismic media CDN. Existing UI and game files under the site's static public directory, and third-party embeds such as Giphy, SHALL keep working.

#### Scenario: Post and résumé images render without Prismic
- **WHEN** a visitor views a post hero, a post gallery, or a résumé company logo
- **THEN** the image is shown
- **AND** the image request is not served from `images.prismic.io`

#### Scenario: Existing static files stay available
- **WHEN** a visitor views the résumé avatar or other files already stored in the site's public static directory
- **THEN** those files still load
