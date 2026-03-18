import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getManuals, getSections, getArticles } from '@/lib/content';
import HomeNav from '@/components/HomeNav';

interface Props {
  params: Promise<{ manual: string; section: string }>;
}

export async function generateStaticParams() {
  const manuals = await getManuals();
  const params: Array<{ manual: string; section: string }> = [];
  for (const manual of manuals) {
    const sections = await getSections(manual.slug);
    sections.forEach((section) => {
      params.push({ manual: manual.slug, section: section.slug });
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
    return <div style={{ minHeight: '100vh', backgroundColor: '#0D1117', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>Section not found</div>;
  }

  const articles = await getArticles(manualSlug, sectionSlug);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1117' }}>
      <HomeNav />

      {/* Header */}
      <div style={{ padding: '8rem 2rem 4rem', background: 'linear-gradient(180deg, #070A0E 0%, #0D1117 100%)' }} className="md:px-16">
        <div style={{ maxWidth: '56rem' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.25)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
            <Link href={`/${manualSlug}`} style={{ color: 'rgba(255,255,255,0.25)' }}>{manual.title}</Link>
          </div>

          <p style={{ color: 'rgba(197,162,88,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600, marginBottom: '1rem' }}>
            {manual.title}
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            {section.title}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.0625rem', lineHeight: 1.6, fontWeight: 300 }}>
            {section.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 2rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} className="md:mx-16" />

      {/* Articles */}
      <div style={{ padding: '4rem 2rem 6rem' }} className="md:px-16">
        <div style={{ maxWidth: '48rem' }}>
          {articles.length > 0 ? (
            <>
              <p style={{ color: 'rgba(197,162,88,0.4)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600, marginBottom: '2rem' }}>
                {articles.length} {articles.length === 1 ? 'Module' : 'Modules'}
              </p>

              {articles.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/${manualSlug}/${sectionSlug}/${article.slug}`}
                  className="group"
                  style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none' }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontFamily: 'monospace', flexShrink: 0, width: '1.25rem', textAlign: 'right' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="group-hover:text-white transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', fontWeight: 500, display: 'block' }}>
                      {article.title}
                    </span>
                    {article.description && (
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8125rem', marginTop: '0.25rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {article.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.875rem' }}>No modules in this section yet.</p>
          )}

          {/* Back */}
          <div style={{ marginTop: '3rem' }}>
            <Link
              href={`/${manualSlug}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.875rem' }}
            >
              <ArrowLeft size={14} />
              Back to {manual.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
