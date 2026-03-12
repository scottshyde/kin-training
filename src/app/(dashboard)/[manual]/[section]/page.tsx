import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getManuals, getSections, getArticles } from '@/lib/content';

interface Props {
  params: Promise<{ manual: string; section: string }>;
}

export async function generateStaticParams() {
  const manuals = await getManuals();
  const params: Array<{ manual: string; section: string }> = [];

  for (const manual of manuals) {
    const sections = await getSections(manual.slug);
    sections.forEach((section) => {
      params.push({
        manual: manual.slug,
        section: section.slug,
      });
    });
  }

  return params;
}

export default async function SectionPage({ params }: Props) {
  const { manual: manualSlug, section: sectionSlug } = await params;
  const manuals = await getManuals();
  const manual = manuals.find((m) => m.slug === manualSlug);
  const sections = await getSections(manualSlug);
  const section = sections.find((s) => s.slug === sectionSlug);

  if (!manual || !section) {
    return <div>Section not found</div>;
  }

  const articles = await getArticles(manualSlug, sectionSlug);

  return (
    <div className="bg-kin-cream min-h-screen px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: manual.title, href: `/${manualSlug}` },
            { label: section.title, href: `/${manualSlug}/${sectionSlug}` },
          ]}
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kin-black mb-4">
            {section.title}
          </h1>
          <p className="text-gray-700 text-lg">
            {section.description}
          </p>
        </div>

        {/* Articles List */}
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${manualSlug}/${sectionSlug}/${article.slug}`}
                className="group card block bg-white rounded-lg p-6 hover:shadow-lg transition border-l-4 border-transparent hover:border-kin-gold"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-bold text-kin-black mb-2 group-hover:text-kin-gold transition">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-kin-gold group-hover:translate-x-1 transition-transform ml-4 flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No articles in this section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
