import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface Article {
  slug: string;
  title: string;
  description: string;
  order: number;
  content?: string;
  frontmatter?: Record<string, any>;
}

export interface Section {
  slug: string;
  title: string;
  description: string;
  order: number;
  icon?: string;
}

export interface Manual {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface MetaFile {
  title: string;
  description: string;
  icon: string;
  order: number;
  sections?: Record<string, { title: string; description: string; order: number }>;
}

export async function getManuals(): Promise<Manual[]> {
  try {
    const manualDirs = await fs.readdir(CONTENT_DIR);

    const manuals: Manual[] = [];

    for (const manualDir of manualDirs) {
      if (manualDir.startsWith('.')) continue;

      const stat = await fs.stat(path.join(CONTENT_DIR, manualDir));
      if (!stat.isDirectory()) continue;

      const metaPath = path.join(CONTENT_DIR, manualDir, '_meta.json');
      try {
        const metaContent = await fs.readFile(metaPath, 'utf-8');
        const meta: MetaFile = JSON.parse(metaContent);

        manuals.push({
          slug: manualDir,
          title: meta.title,
          description: meta.description,
          icon: meta.icon,
          order: meta.order,
        });
      } catch (e) {
        // Ignore if meta doesn't exist
      }
    }

    return manuals.sort((a, b) => a.order - b.order);
  } catch (e) {
    return [];
  }
}

export async function getSections(manualSlug: string): Promise<Section[]> {
  try {
    const metaPath = path.join(CONTENT_DIR, manualSlug, '_meta.json');
    const metaContent = await fs.readFile(metaPath, 'utf-8');
    const meta: MetaFile = JSON.parse(metaContent);

    if (!meta.sections) return [];

    return Object.entries(meta.sections)
      .map(([slug, section]) => ({
        slug,
        title: section.title,
        description: section.description,
        order: section.order,
      }))
      .sort((a, b) => a.order - b.order);
  } catch (e) {
    return [];
  }
}

export async function getArticles(manualSlug: string, sectionSlug: string): Promise<Article[]> {
  try {
    const sectionPath = path.join(CONTENT_DIR, manualSlug, sectionSlug);

    const stat = await fs.stat(sectionPath).catch(() => null);
    if (!stat?.isDirectory()) return [];

    const files = await fs.readdir(sectionPath);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const articles: Article[] = [];

    for (const file of mdxFiles) {
      const filePath = path.join(sectionPath, file);
      const source = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(source);

      articles.push({
        slug: file.replace('.mdx', ''),
        title: data.title || file,
        description: data.description || '',
        order: data.order || 0,
      });
    }

    return articles.sort((a, b) => a.order - b.order);
  } catch (e) {
    return [];
  }
}

export async function getArticle(
  manualSlug: string,
  sectionSlug: string,
  articleSlug: string
): Promise<(Article & { content: string }) | null> {
  try {
    const filePath = path.join(
      CONTENT_DIR,
      manualSlug,
      sectionSlug,
      `${articleSlug}.mdx`
    );

    const source = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(source);

    return {
      slug: articleSlug,
      title: data.title || articleSlug,
      description: data.description || '',
      order: data.order || 0,
      content,
      frontmatter: data,
    };
  } catch (e) {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const manuals = await getManuals();
    const allArticles: Article[] = [];

    for (const manual of manuals) {
      const sections = await getSections(manual.slug);
      for (const section of sections) {
        const articles = await getArticles(manual.slug, section.slug);
        allArticles.push(...articles);
      }
    }

    return allArticles;
  } catch (e) {
    return [];
  }
}

export async function getArticleCount(manualSlug: string): Promise<number> {
  try {
    const sections = await getSections(manualSlug);
    let count = 0;

    for (const section of sections) {
      const articles = await getArticles(manualSlug, section.slug);
      count += articles.length;
    }

    return count;
  } catch (e) {
    return 0;
  }
}
