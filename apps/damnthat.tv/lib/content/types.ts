export type ContentPost = {
  uid: string;
  title: string;
  description: string;
  publishedOn: string;
  draft: boolean;
  tags: string[];
  hero: string;
  heroAlt: string;
  thumb: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: string;
  body: string;
  directory: string;
};

export type ResumeLink = {
  label: string;
  type: string;
  href: string;
};

export type ResumeLinkGroup = {
  title: string;
  items: ResumeLink[];
};

export type ResumeDocument = {
  name: string;
  jobTitle: string;
  location: string;
  links: ResumeLinkGroup[];
  body: string;
  directory: string;
};

export type HomepageDocument = {
  body: string;
};

export type ContentRootOptions = {
  root?: string;
};
