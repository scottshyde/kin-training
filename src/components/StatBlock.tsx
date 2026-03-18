'use client';

interface StatBlockProps {
  stats: Array<{ value: string; label: string }>;
}

/** Grid of large numbers/stats that command attention */
export default function StatBlock({ stats }: StatBlockProps) {
  if (!stats || stats.length === 0) return null;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
      gap: '1px',
      margin: '2.5rem 0',
      background: 'rgba(46, 139, 87, 0.15)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#C5A258',
            lineHeight: 1,
            marginBottom: '0.5rem',
            letterSpacing: '-0.03em',
          }}>
            {stat.value}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.625rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#9BBFAB',
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
