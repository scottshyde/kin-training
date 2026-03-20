import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Accordion from '@/components/Accordion';
import { Tabs, Tab } from '@/components/Tabs';
import ArticleVideo from '@/components/ArticleVideo';
import Callout from '@/components/Callout';
import Lead from '@/components/Lead';
import PullQuote from '@/components/PullQuote';
import StatBlock from '@/components/StatBlock';
import KeyTerm from '@/components/KeyTerm';
import Steps, { Step } from '@/components/Steps';
import GoldRule from '@/components/GoldRule';
import BillCalculator from '@/components/BillCalculator';
import { getManuals, getSections, getArticles, getArticle } from '@/lib/content';
import HomeNav from '@/components/HomeNav';

const mdxComponents = {
  Accordion,
  Tabs,
  Tab,
  ArticleVideo,
  Callout,
  Lead,
  PullQuote,
  StatBlock,
  KeyTerm,
  Steps,
  Step,
  GoldRule,
  BillCalculator,
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
        params.push({ manual: manual.slug, section: section.slug, slug: article.slug });
      });
    }
  }
  return params;
}

/** Strip the leading `# Title` line from MDX content since the page header already shows it */
function stripLeadingH1(content: string): string {
  return content.replace(/^\s*#\s+[^\n]+\n*/, '');
}

export default async function ArticlePage({ params }: Props) {
  const { manual: manualSlug, section: sectionSlug, slug: articleSlug } = await params;

  const manuals = await getManuals();
  const manual = manuals.find((m) => m.slug === manualSlug);
  const sections = await getSections(manualSlug);
  const section = sections.find((s) => s.slug === sectionSlug);
  const article = await getArticle(manualSlug, sectionSlug, articleSlug);

  if (!manual || !section || !article) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#0D1117', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>Article not found</div>;
  }

  const allArticles = await getArticles(manualSlug, sectionSlug);
  const currentIndex = allArticles.findIndex((a) => a.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const cleanContent = stripLeadingH1(article.content);
  const hasVideo = !!article.frontmatter?.video;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111518' }}>
      <HomeNav />

      {/* ─── HERO HEADER ─── */}
      <div
        style={{
          padding: '10rem 2rem 4rem',
          background: 'linear-gradient(180deg, #060809 0%, #0D1117 60%, #111518 100%)',
          borderBottom: '1px solid rgba(197,162,88,0.08)',
        }}
        className="md:px-16"
      >
        <div style={{ maxWidth: '64rem' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.6875rem', letterSpacing: '0.03em', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ color: 'rgba(197,162,88,0.2)' }}>/</span>
            <Link href={`/${manualSlug}`} style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}>{manual.title}</Link>
            <span style={{ color: 'rgba(197,162,88,0.2)' }}>/</span>
            <Link href={`/${manualSlug}/${sectionSlug}`} style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}>{section.title}</Link>
          </div>

          {/* Overline */}
          <p style={{
            color: 'rgba(197,162,88,0.6)',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontWeight: 600,
            marginBottom: '1.5rem',
            fontFamily: "'Inter', sans-serif",
          }}>
            {section.title}
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            maxWidth: '42rem',
          }}>
            {article.title}
          </h1>

          {/* Description */}
          {article.description && (
            <p style={{
              color: 'rgba(197,162,88,0.6)',
              fontSize: '1.125rem',
              maxWidth: '38rem',
              lineHeight: 1.7,
              fontWeight: 300,
              fontFamily: "'Inter', sans-serif",
            }}>
              {article.description}
            </p>
          )}

          {/* Gold accent line */}
          <div style={{
            width: '3rem',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(197,162,88,0.6), rgba(197,162,88,0))',
            marginTop: '2.5rem',
          }} />
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ padding: '4rem 2rem 6rem' }} className="md:px-16">
        <div style={{ maxWidth: hasVideo ? '72rem' : '52rem' }}>

          {/* Float video right if present */}
          {hasVideo && (
            <div style={{ float: 'right', marginLeft: '3rem', marginBottom: '2rem' }}>
              <ArticleVideo src={article.frontmatter!.video} />
            </div>
          )}

          <article className="prose-dark">
            <MDXRemote source={cleanContent} components={mdxComponents} />
          </article>

          {/* Clear float */}
          <div style={{ clear: 'both' }} />

          {/* ─── NAVIGATION ─── */}
          <div style={{
            marginTop: '5rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(197,162,88,0.08)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
              {prevArticle ? (
                <Link
                  href={`/${manualSlug}/${sectionSlug}/${prevArticle.slug}`}
                  className="group"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    textDecoration: 'none',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'border-color 0.3s, background 0.3s',
                    background: 'transparent',
                  }}
                >
                  <ArrowLeft size={14} style={{ color: 'rgba(197,162,88,0.4)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.5625rem', color: 'rgba(197,162,88,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontWeight: 600 }}>Previous</span>
                    <span className="group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem', fontWeight: 500, fontFamily: "'Playfair Display', serif" }}>
                      {prevArticle.title}
                    </span>
                  </div>
                </Link>
              ) : <div />}
              {nextArticle ? (
                <Link
                  href={`/${manualSlug}/${sectionSlug}/${nextArticle.slug}`}
                  className="group"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    textAlign: 'right',
                    textDecoration: 'none',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'border-color 0.3s, background 0.3s',
                    background: 'transparent',
                  }}
                >
                  <div>
                    <span style={{ display: 'block', fontSize: '0.5625rem', color: 'rgba(197,162,88,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontWeight: 600 }}>Next</span>
                    <span className="group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem', fontWeight: 500, fontFamily: "'Playfair Display', serif" }}>
                      {nextArticle.title}
                    </span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'rgba(197,162,88,0.4)', flexShrink: 0, marginTop: '0.25rem' }} />
                </Link>
              ) : <div />}
            </div>

            {/* Back */}
            <div style={{ textAlign: 'center' }}>
              <Link
                href={`/${manualSlug}/${sectionSlug}`}
                style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', letterSpacing: '0.05em', transition: 'color 0.2s' }}
              >
                Back to {section.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
