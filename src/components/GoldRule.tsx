'use client';

/** Decorative gold gradient divider — visual landmark between sections */
export default function GoldRule() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(197, 162, 88, 0.3), transparent)',
      margin: '3rem 0',
    }} />
  );
}
