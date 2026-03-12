import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Accordion from '@/components/Accordion';
import { Tabs, Tab } from '@/components/Tabs';
import { getManuals, getSections, getArticles, getArticle } from '@/lib/content';

const mdxComponents = {
  Accordion,
  Tabs,
  Tab,
};

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

  const allArticles = await getArticles(manualSlug, sectionSlug);
  const currentIndex = allArticles.findIndex((a) => a.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-kin-cream">
      {/* Dark hero */}
      <div className="hero-gradient text-white px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: manual.title, href: `/${manualSlug}` },
              { label: section.title, href: `/${manualSlug}/${sectionSlug}` },
              { label: article.title, href: `/${manualSlug}/${sectionSlug}/${articleSlug}` },
            ]}
            dark
          />
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-white mb-3">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-gray-300 text-lg max-w-2xl mb-5">
              {article.description}
            </p>
          )}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium bg-kin-green/30 text-green-200 px-3 py-1 rounded-full">
              {section.title}
            </span>
            <span className="text-xs font-medium bg-kin-gold/20 text-kin-gold px-3 py-1 rounded-full">
              {manual.title}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-10">
        {/* Article Content */}
        <article className="bg-white rounded-xl p-8 md:p-12 mb-12 border border-[#e5e1d8] prose-kin" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <MDXRemote source={article.content} components={mdxComponents} />
        </article>

        {/* Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {prevArticle ? (
            <Link
              href={`/${manualSlug}/${sectionSlug}/${prevArticle.slug}`}
              className="group card-premium flex items-center gap-4 p-5"
            >
              <ArrowLeft size={18} className="text-kin-green group-hover:text-kin-gold transition flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Previous</div>
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-sm font-bold text-kin-black group-hover:text-kin-gold transition truncate">
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
              className="group card-premium flex items-center gap-4 p-5"
            >
              <div className="flex-1 min-w-0 text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Next</div>
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-sm font-bold text-kin-black group-hover:text-kin-gold transition truncate">
                  {nextArticle.title}
                </div>
              </div>
              <ArrowRight size={18} className="text-kin-gold group-hover:text-kin-green transition flex-shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to section */}
        <div className="text-center">
          <Link
            href={`/${manualSlug}/${sectionSlug}`}
            className="inline-flex items-center gap-2 text-kin-green hover:text-kin-gold font-medium text-sm transition"
          >
            <ArrowLeft size={16} />
            Back to {section.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
