import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-kin-cream">
      {/* Dark hero */}
      <div className="hero-gradient text-white px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs
            items={[
              { label: manual.title, href: `/${manualSlug}` },
              { label: section.title, href: `/${manualSlug}/${sectionSlug}` },
            ]}
            dark
          />
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-white mb-3">
            {section.title}
          </h1>
          <p className="text-gray-300 text-lg">
            {section.description}
          </p>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${manualSlug}/${sectionSlug}/${article.slug}`}
                className="group card-article block p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <FileText size={20} className="text-kin-gold flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-kin-black mb-1 group-hover:text-kin-gold transition">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                          {article.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-kin-gold group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-[#e5e1d8]">
            <p className="text-gray-400">No articles in this section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
