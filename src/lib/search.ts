import Fuse from 'fuse.js';
import { getManuals, getSections, getArticles } from './content';

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  manualSlug: string;
  sectionSlug: string;
  manualTitle: string;
  sectionTitle: string;
}

export async function buildSearchIndex(): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  const manuals = await getManuals();

  for (const manual of manuals) {
    const sections = await getSections(manual.slug);

    for (const section of sections) {
      const articles = await getArticles(manual.slug, section.slug);

      articles.forEach((article) => {
        results.push({
          slug: article.slug,
          title: article.title,
          description: article.description,
          manualSlug: manual.slug,
          sectionSlug: section.slug,
          manualTitle: manual.title,
          sectionTitle: section.title,
        });
      });
    }
  }

  return results;
}

export async function search(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const index = await buildSearchIndex();

  const fuse = new Fuse(index, {
    keys: ['title', 'description', 'sectionTitle', 'manualTitle'],
    threshold: 0.3,
  });

  return fuse.search(query).map((result) => result.item);
}
