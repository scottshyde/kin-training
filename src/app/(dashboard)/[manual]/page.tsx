import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getManuals, getSections, getArticles } from '@/lib/content';

interface Props {
  params: Promise<{ manual: string }>;
}

export async function generateStaticParams() {
  const manuals = await getManuals();
  return manuals.map((manual) => ({
    manual: manual.slug,
  }));
}

export default async function ManualPage({ params }: Props) {
  const { manual: manualSlug } = await params;
  const manuals = await getManuals();
  const manual = manuals.find((m) => m.slug === manualSlug);

  if (!manual) {
    return <div>Manual not found</div>;
  }

  const sections = await getSections(manualSlug);

  // Fetch article counts for each section
  const sectionData = await Promise.all(
    sections.map(async (section) => {
      const articles = await getArticles(manualSlug, section.slug);
      return {
        ...section,
        articleCount: articles.length,
      };
    })
  );

  return (
    <div className="bg-kin-cream min-h-screen px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: manual.title, href: `/${manualSlug}` }]} />

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kin-black mb-4">
            {manual.title}
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl">
            {manual.description}
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectionData.map((section) => (
            <Link
              key={section.slug}
              href={`/${manualSlug}/${section.slug}`}
              className="group card bg-white rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="font-playfair text-xl font-bold text-kin-black mb-2 group-hover:text-kin-gold transition">
                {section.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {section.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {section.articleCount} {section.articleCount === 1 ? 'article' : 'articles'}
                </span>
                <ArrowRight
                  size={18}
                  className="text-kin-gold group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
