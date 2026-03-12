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
    <div className="min-h-screen bg-kin-cream">
      {/* Dark hero */}
      <div className="hero-gradient text-white px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={[{ label: manual.title, href: `/${manualSlug}` }]} dark />
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-white mb-3">
            {manual.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {manual.description}
          </p>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectionData.map((section, index) => (
            <Link
              key={section.slug}
              href={`/${manualSlug}/${section.slug}`}
              className="group card-premium flex gap-5 p-6"
            >
              {/* Number badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kin-green flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-kin-black mb-1 group-hover:text-kin-gold transition">
                  {section.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {section.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {section.articleCount} {section.articleCount === 1 ? 'article' : 'articles'}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-kin-gold group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
