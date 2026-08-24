import type { MetadataRoute } from 'next';
import { explorations } from '@/content/site-content';

const siteUrl = 'https://xingyuww.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const explorationPages = explorations.map(({ slug }) => ({
    url: `${siteUrl}/explorations/${slug}/`,
    lastModified: new Date('2026-08-24'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/projects/music/`,
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...explorationPages,
  ];
}
