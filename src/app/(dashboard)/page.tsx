import Link from 'next/link';
import { BookOpen, Hammer, UserCheck, ArrowRight } from 'lucide-react';
import { getManuals, getArticleCount } from '@/lib/content';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={32} />,
  Hammer: <Hammer size={32} />,
  UserCheck: <UserCheck size={32} />,
};

export default async function DashboardPage() {
  const manuals = await getManuals();

  return (
    <div className="bg-kin-cream min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-kin-black to-kin-green text-white px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Welcome to KIN Home Training
          </h1>
          <p className="text-kin-cream text-lg md:text-xl max-w-2xl">
            Master the Griffin Hill sales system. Everything you need to excel in sales,
            team building, and customer success.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Start Here Banner */}
        <div className="bg-white border-l-4 border-kin-gold rounded-lg p-6 mb-12 shadow-md">
          <h2 className="font-playfair text-2xl font-bold text-kin-black mb-2">
            Start Here: Needs Audit
          </h2>
          <p className="text-gray-700 mb-4">
            New to the team? Start with the Needs Audit in the Closer Manual to understand
            the foundation of our sales process.
          </p>
          <Link
            href="/closer-manual"
            className="inline-flex items-center gap-2 bg-kin-green hover:bg-kin-green/90 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            Get Started <ArrowRight size={20} />
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
                className="group card bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className="inline-flex p-4 bg-kin-cream rounded-lg mb-4 text-kin-gold group-hover:text-kin-green transition">
                    {iconMap[manual.icon] || <BookOpen size={32} />}
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-2xl font-bold text-kin-black mb-2 group-hover:text-kin-gold transition">
                    {manual.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {manual.description}
                  </p>

                  {/* Article Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                    </span>
                    <ArrowRight
                      size={20}
                      className="text-kin-gold group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex p-3 bg-kin-gold/20 rounded-full mb-4">
              <BookOpen size={24} className="text-kin-gold" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-kin-black mb-2">
              Comprehensive Manuals
            </h3>
            <p className="text-gray-600 text-sm">
              Access detailed training materials covering all aspects of solar sales.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-kin-green/20 rounded-full mb-4">
              <Hammer size={24} className="text-kin-green" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-kin-black mb-2">
              Team Building
            </h3>
            <p className="text-gray-600 text-sm">
              Learn strategies to build and scale your sales team with proven norms.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-kin-green/10 rounded-full mb-4">
              <UserCheck size={24} className="text-kin-green" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-kin-black mb-2">
              Skill Mastery
            </h3>
            <p className="text-gray-600 text-sm">
              Develop expertise in setting, closing, and managing customer relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
