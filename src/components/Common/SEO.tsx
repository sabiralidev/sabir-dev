import { useEffect } from 'react';

export type BreadcrumbItem = {
  name: string;
  item: string;
};

type SEOProps = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'profile' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
};

const SITE_URL = 'https://sabir-dev.vercel.app';

const setMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

const setLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image = `${SITE_URL}/og-image.png`,
  type = 'website',
  noindex = false,
  jsonLd,
  breadcrumbs,
}) => {
  useEffect(() => {
    document.title = title;
    setLink('canonical', canonical);
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'SabirAliDev' });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  }, [canonical, description, image, noindex, title, type]);

  useEffect(() => {
    const data = [];
    if (jsonLd) {
      data.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
    }
    if (breadcrumbs?.length) {
      data.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.item,
        })),
      });
    }

    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (!data.length) {
      script?.remove();
      return;
    }
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data.length === 1 ? data[0] : data);
  }, [breadcrumbs, jsonLd]);

  return null;
};
