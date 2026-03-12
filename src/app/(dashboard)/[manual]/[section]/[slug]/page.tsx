import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getManuals, getSections, getArticles, getArticle } from '@/lib/content';

interface Props {
  params: Promise<{ manual: string; section: string; slug: string }>;
}

export async function generateStaticParams() {
  const manuals = await getManuals();
  const params: Array<{ manual: string; section: string; slug: string }> = [];

  for (const manual of manuals) {
    const sections = await getSections(manual.slug);
    for (const section of sections) {
      const articles = await getArticles(manual.slug, section.slug);
      articles.forEach((article) => {
        params.push({
          manual: manual.slug,
          section: section.slug,
          slug: article.slug,
        });
      });
    }
  }

  return params;
}

export default async function ArticlePage({ params }: Props) {
  const { manual: manualSlug, section: sectionSlug, slug: articleSlug } = await params;

  const manuals = await getManuals();
  const manual = manuals.find((m) => m.slug === manualSlug);
  const sections = await getSections(manualSlug);
  const section = sections.find((s) => s.slug === sectionSlug);
  const article = await getArticle(manualSlug, sectionSlug, articleSlug);

  if (!manual || !section || !article) {
    return <div>Article not found</div>;
  }

  // Get all articles in section for navigation
  const allArticles = await getArticles(manualSlug, sectionSlug);
  const currentIndex = allArticles.findIndex((a) => a.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="bg-kin-cream min-h-screen">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: manual.title, href: `/${manualSlug}` },
            { label: section.title, href: `/${manualSlug}/${sectionSlug}` },
            { label: article.title, href: `/${manualSlug}/${sectionSlug}/${articleSlug}` },
          ]}
        />

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="font-playfair text-5xl font-bold text-kin-black mb-4">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-gray-700 text-lg max-w-2xl">
              {article.description}
            </p>
          )}
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-kin-green/10 text-kin-green px-3 py-1 rounded-full">
              {section.title}
            </span>
            <span className="bg-kin-gold/10 text-kin-gold px-3 py-1 rounded-full">
              {manual.title}
            </span>
          </div>
        </header>

        {/* Article Content */}
        <article className="bg-white rounded-lg p-8 md:p-12 shadow-md mb-12 prose prose-lg max-w-none">
          <style>{`
            article h1 { font-family: var(--font-playfair); font-size: 2.25rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #0D1117; }
            article h2 { font-family: var(--font-playfair); font-size: 1.875rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #0D1117; }
            article h3 { font-family: var(--font-playfair); font-size: 1.5rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #1F2937; }
            article h4 { font-family: var(--font-playfair); font-size: 1.25rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; color: #1F2937; }
            article p { margin: 1.5rem 0; line-height: 1.8; color: #374151; }
            article ul, article ol { margin: 1.5rem 0 1.5rem 2rem; }
            article li { margin: 0.5rem 0; color: #374151; }
            article a { color: #006039; text-decoration: none; border-bottom: 1px dotted #C5A258; }
            article a:hover { color: #C5A258; }
            article blockquote { border-left: 4px solid #C5A258; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #6B7280; }
            article code { background-color: #F3F4F6; color: #1F2937; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-family: monospace; }
            article pre { background-color: #1F2937; color: #F3F4F6; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; }
            article table { width: 100%; border-collapse: collapse; margin: 2rem 0; }
            article th, article td { border: 1px solid #E5E7EB; padding: 0.75rem 1rem; text-align: left; }
            article th { background-color: #F3F4F6; color: #0D1117; font-weight: 600; }
            article img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 2rem 0; }
          `}</style>
          <MDXRemote source={article.content} />
        </article>

        {/* Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {prevArticle ? (
            <Link
              href={`/${manualSlug}/${sectionSlug}/${prevArticle.slug}`}
              className="group card flex items-center gap-4 p-6 bg-white rounded-lg hover:shadow-lg transition border-l-4 border-kin-green hover:border-kin-gold"
            >
              <ArrowLeft size={20} className="text-kin-green group-hover:text-kin-gold transition flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Previous</div>
                <div className="font-playfair text-lg font-bold text-kin-black group-hover:text-kin-gold transition">
                  {prevArticle.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <Link
              href={`/${manualSlug}/${sectionSlug}/${nextArticle.slug}`}
              className="group card flex items-center gap-4 p-6 bg-white rounded-lg hover:shadow-lg transition border-l-4 border-kin-gold hover:border-kin-green text-right md:text-left"
            >
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-1">Next</div>
                <div className="font-playfair text-lg font-bold text-kin-black group-hover:text-kin-gold transition">
                  {nextArticle.title}
                </div>
              </div>
              <ArrowRight size={20} className="text-kin-gold group-hover:text-kin-green transition flex-shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to section */}
        <div className="text-center">
          <Link
            href={`/${manualSlug}/${sectionSlug}`}
            className="inline-flex items-center gap-2 text-kin-green hover:text-kin-gold font-medium transition"
          >
            <ArrowLeft size={18} />
            Back to {section.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
