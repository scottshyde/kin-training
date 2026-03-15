import Link from 'next/link';
import { BookOpen, Hammer, UserCheck, ArrowRight, Zap, Users, Target } from 'lucide-react';
import { getManuals, getArticleCount } from '@/lib/content';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={28} />,
  Hammer: <Hammer size={28} />,
  UserCheck: <UserCheck size={28} />,
};

export default async function DashboardPage() {
  const manuals = await getManuals();

  return (
    <div className="min-h-screen bg-kin-cream">
      {/* Hero Section */}
      <div className="hero-gradient text-white px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-kin-gold text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            Griffin Hill Sales System
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Welcome to KIN Home Training
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            Master the Griffin Hill sales system. Everything you need to excel in sales,
            team building, and customer success.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Start Here Banner */}
        <div className="bg-white rounded-xl p-6 mb-12 border border-[#e5e1d8]" style={{ borderLeft: '4px solid var(--color-kin-gold)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-kin-black mb-2">
            Start Here: Setter Manual
          </h2>
          <p className="text-gray-600 mb-4">
            New to the team? Start with the Setter Manual — learn the Case Open, Needs Audit,
            and the mindset that gets you setting quality appointments from day one.
          </p>
          <Link
            href="/setter-manual"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #006039, #007a49)' }}
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        {/* Manual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {await Promise.all(
            manuals.map(async (manual) => {
              const articleCount = await getArticleCount(manual.slug);
              return { manual, articleCount };
            })
          ).then((results) =>
            results.map(({ manual, articleCount }) => (
              <Link
                key={manual.slug}
                href={`/${manual.slug}`}
                className="group card-premium block p-8"
              >
                {/* Icon */}
                <div className="inline-flex p-3.5 bg-kin-cream rounded-xl mb-5 text-kin-gold group-hover:text-kin-green transition">
                  {iconMap[manual.icon] || <BookOpen size={28} />}
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-kin-black mb-2 group-hover:text-kin-gold transition">
                  {manual.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {manual.description}
                </p>

                {/* Article Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-kin-gold group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Gold divider */}
        <hr className="gold-divider" />

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex p-3 bg-kin-gold/10 rounded-full mb-4">
              <Target size={22} className="text-kin-gold" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-kin-black mb-2">
              Comprehensive Manuals
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Access detailed training materials covering all aspects of solar sales.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-kin-green/10 rounded-full mb-4">
              <Users size={22} className="text-kin-green" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-kin-black mb-2">
              Team Building
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Learn strategies to build and scale your sales team with proven norms.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-kin-green/5 rounded-full mb-4">
              <Zap size={22} className="text-kin-green" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-kin-black mb-2">
              Skill Mastery
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Develop expertise in setting, closing, and managing customer relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
