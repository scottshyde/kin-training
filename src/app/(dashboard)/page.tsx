import Link from 'next/link';
import { DoorOpen, Handshake, HardHat, Crown } from 'lucide-react';
import { scenarios } from '@/lib/scenarios';
import HomeNav from '@/components/HomeNav';
import ScenarioVideo from '@/components/ScenarioVideo';

const iconMap: Record<string, React.ReactNode> = {
  DoorOpen: <DoorOpen size={32} strokeWidth={1} />,
  Handshake: <Handshake size={32} strokeWidth={1} />,
  HardHat: <HardHat size={32} strokeWidth={1} />,
  Crown: <Crown size={32} strokeWidth={1} />,
};

const sectionColors = ['#0D1117', '#0A0D12', '#0D1117', '#0A0D12'];

// Map scenario slugs to video files in /public
const scenarioVideos: Record<string, string> = {
  'at-the-door': '/at-the-door.mp4',
  'at-the-kitchen-table': '/at-the-kitchen-table.mp4',
  'on-the-job': '/on-the-job.mp4',
  'building-your-empire': '/building-your-empire.mp4',
};

export default function DashboardPage() {
  return (
    <div style={{ backgroundColor: '#0D1117' }}>
      {/* Floating nav */}
      <HomeNav />

      {/* ===== HERO — Full viewport, single ocean photo ===== */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: '100vh',
          backgroundImage: 'url(/hero-ocean.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient overlays for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.25) 60%, rgba(13,17,23,1) 100%)' }}
        />

        {/* Centered content */}
        <div className="relative z-10 text-center px-8">
          <p
            className="mb-8"
            style={{ color: '#C5A258', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 500 }}
          >
            KIN Home · Griffin Hill Sales System
          </p>
          <h1
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            Master<br />Your Craft
          </h1>
          <p
            className="max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', fontWeight: 300, lineHeight: 1.6 }}
          >
            From the first knock to the signed contract.
          </p>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, rgba(197,162,88,0.5))', margin: '0 auto' }} />
          </div>
        </div>
      </section>

      {/* ===== SCENARIO SECTIONS ===== */}
      {scenarios.map((scenario, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={scenario.slug}
            style={{ backgroundColor: sectionColors[i] || '#0D1117' }}
          >
            <div
              className="flex items-center"
              style={{ minHeight: '85vh' }}
            >
              <div className="w-full px-8 md:px-16 py-24 md:py-32" style={{ maxWidth: '80rem', margin: '0 auto' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: '6rem' }}>
                  {/* Text side */}
                  <div className={!isEven ? 'md:order-2' : ''}>
                    {/* Icon */}
                    <div style={{ color: 'rgba(197,162,88,0.5)', marginBottom: '2rem' }}>
                      {iconMap[scenario.icon]}
                    </div>

                    {/* Overline */}
                    <p style={{ color: 'rgba(197,162,88,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 500, marginBottom: '1.5rem' }}>
                      {scenario.articles.length} Training Modules
                    </p>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      fontWeight: 700,
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      marginBottom: '1.5rem',
                    }}>
                      {scenario.title}
                    </h2>

                    {/* Subtitle */}
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', marginBottom: '2rem' }}>
                      {scenario.subtitle}
                    </p>

                    {/* Description */}
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '28rem', marginBottom: '3rem' }}>
                      {scenario.description}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/scenario/${scenario.slug}`}
                      style={{ color: '#C5A258', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', borderBottom: '1px solid rgba(197,162,88,0.3)', paddingBottom: '4px' }}
                    >
                      Enter
                    </Link>
                  </div>

                  {/* Visual side */}
                  {scenarioVideos[scenario.slug] ? (
                    <div className={!isEven ? 'md:order-1' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ScenarioVideo
                        src={scenarioVideos[scenario.slug]}
                        href={`/scenario/${scenario.slug}`}
                      />
                    </div>
                  ) : (
                    <div className={`${!isEven ? 'md:order-1' : ''} hidden md:flex items-center justify-center`}>
                      <span
                        className="select-none"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 'clamp(10rem, 15vw, 18rem)',
                          fontWeight: 700,
                          lineHeight: 1,
                          color: 'transparent',
                          WebkitTextStroke: '1px rgba(197,162,88,0.06)',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Divider between sections */}
            {i < scenarios.length - 1 && (
              <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(197,162,88,0.08), transparent)' }} />
            )}
          </section>
        );
      })}

      {/* ===== FOOTER ===== */}
      <section style={{ backgroundColor: '#0D1117', padding: '6rem 0' }}>
        <div className="text-center px-8">
          <p style={{ color: 'rgba(197,162,88,0.3)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1.5rem' }}>
            KIN Home
          </p>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.875rem' }}>
            Griffin Hill Integrity Sales System
          </p>
        </div>
      </section>
    </div>
  );
}
