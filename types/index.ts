export type EditorialImage = {
  src: string;
  alt: string;
  category: string;
  caption?: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  author?: string;
  authorId?: string;
  date?: string;
  readTime?: string;
  image: string;
  imageAlt?: string;
  description?: string;
  industrySlug?: string;
  issueSlug?: string;
  tags?: string[];
  featured?: boolean;
  body?: ArticleSection[];
  pullQuote?: string;
  stats?: { label: string; value: string }[];
  contentType?: string;
  homePlacement?: Record<string, boolean>;
};

export type Author = {
  id: string;
  slug: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
};

export type Leader = {
  id: string;
  slug: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  quote: string;
  industrySlug: string;
  featuredOnHome?: boolean;
};

export type MagazineStory = {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  articleSlug: string;
  page: number;
};

export type MagazineIssue = {
  id?: string;
  issue: string;
  issueNumber?: string;
  publicationDate?: string;
  slug: string;
  date: string;
  year?: string;
  title: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
  contents: string[];
  description: string;
  stories: MagazineStory[];
  pdfUrl?: string;
};

export type Industry = {
  slug: string;
  name: string;
  descriptor: string;
  image: string;
  imageAlt: string;
  overview: string;
  marketSignal: string;
};

export type Startup = {
  id: string;
  slug: string;
  name: string;
  sector: string;
  stage: string;
  location: string;
  image: string;
  imageAlt: string;
  summary: string;
  founder: string;
  featuredOnHome?: boolean;
};

export type Insight = Article;

export type EventItem = {
  id: string;
  slug: string;
  day: string;
  month: string;
  title: string;
  date: string;
  location: string;
  image: string;
  imageAlt: string;
  description: string;
  speakers: string[];
  agenda: string[];
  registrationUrl?: string;
  featuredOnHome?: boolean;
};

export type SiteSettings = {
  name: string;
  domain: string;
  description: string;
  founded: string;
  email: string;
};
