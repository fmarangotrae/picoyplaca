export type MetaRobot = 'index,follow' | 'noindex,nofollow' | 'index,nofollow' | 'noindex,follow';

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  jsonLd?: unknown;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  siteVerification?: {
    google?: string;
    bing?: string;
  };
}

export function buildCanonical(path: string, site = 'https://picoyplaca.co'): string {
  if (!path || path.startsWith('http')) return path;
  const base = site.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function seoTitle(partial: string, base = 'Pico y Placa Colombia'): string {
  if (!partial) return `${base} · picoyplaca.co`;
  return `${partial} · ${base}`;
}

export interface SiteVerification {
  google?: string;
  bing?: string;
}

export interface RichJsonLd {
  faq: boolean;
  howTo: boolean;
  breadcrumb: boolean;
  citySchedule: boolean;
  event: boolean;
}
