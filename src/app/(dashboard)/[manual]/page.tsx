import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getManuals, getSections, getArticles } from '@/lib/content';
import HomeNav from '@/components/HomeNav';

interface Props {
  params: Promise<{ manual: string }>;
}

export async function generateStaticParams() {
  const manuals = await getManuals();
  return manuals.map((manual) => ({ manual: manual.slug }));
}

export default async function ManualPage({ params }: Props) {
  const { manual: manualSlug } = await params;
  const manuals = await getManuals();
  const manual = manuals.find((m) => m.slug === manualSlug);

  if (!manual) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#0D1117', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>Manual not found</div>;
  }

  const sections = await getSections(manualSlug);
  const sectionData = await Promise.all(
    sections.map(async (section) => {
      const articles = await getArticles(manualSlug, section.slug);
      return { ...section, articleCount: articles.length };
    })
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1117' }}>
      <HomeNav />

      {/* Header */}
      <div style={{ padding: '8rem 2rem 4rem', background: 'linear-gradient(180deg, #070A0E 0%, #0D1117 100%)' }} className="md:px-16">
        <div style={{ maxWidth: '56rem' }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '3rem' }}
          >
            <ArrowLeft size={12} />
            Home
          </Link>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            {manual.title}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.125rem', maxWidth: '36rem', lineHeight: 1.6, fontWeight: 300 }}>
            {manual.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 2rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} className="md:mx-16" />

      {/* Sections */}
      <div style={{ padding: '4rem 2rem 6rem' }} className="md:px-16">
        <div style={{ maxWidth: '48rem' }}>
          <p style={{ color: 'rgba(197,162,88,0.4)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600, marginBottom: '2rem' }}>
            {sectionData.length} Sections
          </p>

          {sectionData.map((section, i) => (
            <Link
              key={section.slug}
              href={`/${manualSlug}/${section.slug}`}
              className="group"
              style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontFamily: 'monospace', flexShrink: 0, width: '1.25rem', textAlign: 'right' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="group-hover:text-white transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', fontWeight: 500, display: 'block' }}>
                  {section.title}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8125rem', marginTop: '0.25rem', display: 'block' }}>
                  {section.description}
                  {section.articleCount > 0 && (
                    <span style={{ color: 'rgba(197,162,88,0.3)', marginLeft: '0.5rem' }}>· {section.articleCount}</span>
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
