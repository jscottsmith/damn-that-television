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

export type ResumeJob = {
  company: string;
  role: string;
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  website?: string;
  start?: string;
  end?: string;
  present?: boolean;
  keywords: string[];
  body: string;
};

export type ResumeSchool = {
  institution: string;
  copy?: string;
  start?: string;
  end?: string;
};

export type ResumeAward = {
  title: string;
  dates?: string;
};

export type ResumeTechnologyList = {
  intro?: string;
  items: string[];
};

export type ResumeDocument = {
  name: string;
  jobTitle: string;
  company: string;
  location: string;
  links: ResumeLinkGroup[];
  technologies: ResumeTechnologyList;
  interests: string[];
  education: ResumeSchool[];
  awards: ResumeAward[];
  jobs: ResumeJob[];
  body: string;
  directory: string;
};

export type HomepageDocument = {
  body: string;
};

export type ContentRootOptions = {
  root?: string;
};
