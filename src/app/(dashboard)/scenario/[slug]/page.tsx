import Link from 'next/link';
import { ArrowLeft, DoorOpen, Handshake, HardHat, Crown } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { scenarios, getScenarioBySlug } from '@/lib/scenarios';
import { canAccessManual } from '@/lib/roles';
import { getArticle } from '@/lib/content';
import HomeNav from '@/components/HomeNav';

const iconMap: Record<string, React.ReactNode> = {
  DoorOpen: <DoorOpen size={36} strokeWidth={1} />,
  Handshake: <Handshake size={36} strokeWidth={1} />,
  HardHat: <HardHat size={36} strokeWidth={1} />,
  Crown: <Crown size={36} strokeWidth={1} />,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export default async function ScenarioPage({ params }: Props) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#0D1117', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>Not found</div>;
  }

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  // Filter articles to only those the user can access
  const accessibleArticles = scenario.articles.filter((ref) =>
    canAccessManual(role, ref.manual)
  );

  const resolvedArticles = await Promise.all(
    accessibleArticles.map(async (ref) => {
      const article = await getArticle(ref.manual, ref.section, ref.slug);
      return {
        ...ref,
        title: ref.label || article?.title || ref.slug.replace(/-/g, ' '),
        description: article?.description || '',
      };
    })
  );

  const visibleScenarios = scenarios.filter((s) =>
    s.articles.some((a) => canAccessManual(role, a.manual))
  );
  const idx = visibleScenarios.findIndex((s) => s.slug === slug);
  const nextScenario = idx < visibleScenarios.length - 1 ? visibleScenarios[idx + 1] : null;
  const prevScenario = idx > 0 ? visibleScenarios[idx - 1] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1117' }}>
      <HomeNav />

      {/* Hero */}
      <section style={{ minHeight: '55vh', display: 'flex', alignItems: 'flex-end', paddingTop: '8rem', paddingBottom: '4rem' }} className="px-8 md:px-16">
        <div style={{ maxWidth: '56rem' }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '3rem' }}
          >
            <ArrowLeft size={12} />
            Back
          </Link>

          <div style={{ color: 'rgba(197,162,88,0.4)', marginBottom: '2rem' }}>
            {iconMap[scenario.icon]}
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            {scenario.title}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', maxWidth: '32rem' }}>
            {scenario.subtitle}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} className="mx-8 md:mx-16" />

      {/* Article list */}
      <section style={{ paddingTop: '4rem', paddingBottom: '6rem' }} className="px-8 md:px-16">
        <div style={{ maxWidth: '48rem' }}>
          {resolvedArticles.map((article, i) => (
            <Link
              key={`${article.manual}-${article.section}-${article.slug}`}
              href={`/${article.manual}/${article.section}/${article.slug}`}
              className="group"
              style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontFamily: 'monospace', flexShrink: 0, width: '1.25rem', textAlign: 'right' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="group-hover:text-white transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', flex: 1 }}>
                {article.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <section style={{ paddingBottom: '6rem' }} className="px-8 md:px-16">
        <div style={{ maxWidth: '48rem', display: 'flex', justifyContent: 'space-between' }}>
          {prevScenario ? (
            <Link href={`/scenario/${prevScenario.slug}`} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.875rem' }}>
              ← {prevScenario.title}
            </Link>
          ) : <div />}
          {nextScenario ? (
            <Link href={`/scenario/${nextScenario.slug}`} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.875rem' }}>
              {nextScenario.title} →
            </Link>
          ) : <div />}
        </div>
      </section>
    </div>
  );
}
